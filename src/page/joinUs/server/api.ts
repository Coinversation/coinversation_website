import BN from "bn.js";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { TypeRegistry } from "@polkadot/types";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import type { SubmittableResult } from "@polkadot/api/submittable";
import type { IKeyringPair, Codec, DetectCodec } from "@polkadot/types/types";
import type { DispatchErrorModule } from "@polkadot/types/interfaces";
import type { Hash } from "@polkadot/types/interfaces/runtime";
import { u8aConcat, u8aToHex } from "@polkadot/util";
import { BlockHash } from "@polkadot/types/interfaces/chain";
import {
  blake2AsU8a,
  encodeAddress,
  decodeAddress,
} from "@polkadot/util-crypto";
import {
  buildTypes,
  KeyringPairOrAddressAndSigner,
  extractTxArgs,
  getEnv,
} from "../utils/utils";
import config from "@/config";

let endpoint = "";
let apiPromise: ApiPromise | null = null;
const registry = new TypeRegistry();
const types = buildTypes();
registry.register(types);
export const decimals = 10000000000;
export const connected = async (endpoint: string, f: () => Promise<any>) => {
  let api: ApiPromise | null = null;
  try {
    api = await connect(endpoint);
    await f();
  } catch (e) {
    console.error(e);
  } finally {
    if (api) {
      await api.disconnect();
    }
  }
};

export const getEndpoint = () => {
  const endpoint = localStorage.getItem("endpoint");
  if (endpoint) {
    return endpoint;
  }
  return getEnv(process.env.NODE_ENV).chainEndpoint;
};
export const connect = async (newEndpoint: string): Promise<ApiPromise> => {
  if (apiPromise) {
    if (endpoint === newEndpoint) {
      return apiPromise;
    }
    await apiPromise.disconnect();
  }
  endpoint = newEndpoint;
  // @ts-ignore
  apiPromise = await ApiPromise.create({
    provider: new WsProvider(newEndpoint),
    registry,
    types,
  });
  return apiPromise;
};

export const disconnect = async () => {
  const api = getApi();
  api.disconnect();
};

export const getApi = (): ApiPromise => {
  if (apiPromise) {
    return apiPromise;
  }
  throw new Error("not connected");
};

export const query = <T>(
  f: (query: ApiPromise["query"]) => Promise<T>
): Promise<T> => {
  const api = getApi();
  return f(api.query);
};

export const rpc = <T>(
  f: (rpc: ApiPromise["rpc"]) => Promise<T>
): Promise<T> => {
  const api = getApi();
  return f(api.rpc);
};

export const derive = <T>(
  f: (derive: ApiPromise["derive"]) => Promise<T>
): Promise<T> => {
  const api = getApi();
  return f(api.derive);
};

export const tx = (
  f: (tx: ApiPromise["tx"]) => SubmittableExtrinsic<"promise">,
  account: KeyringPairOrAddressAndSigner,
  powSolution?: BN
) => {
  const api = getApi();

  const [pairOrAddress, options] = extractTxArgs(account, powSolution);

  return new Promise<Hash>(async (resolve, reject) => {
    const unsub = await f(api.tx)
      .signAndSend(pairOrAddress, options, (result: SubmittableResult) => {
        if (!result.isCompleted) {
          return;
        }
        if (unsub) {
          unsub();
        }
        if (result.isError) {
          reject("tx: result.isError");
          return;
        }
        if (result.findRecord("system", "ExtrinsicSuccess")) {
          const sudid = result.findRecord("sudo", "Sudid");
          if (sudid) {
            const d = sudid.event.data[0] as any;
            if (d && d.isError) {
              reject(`sudo: ${buildErrorText(api, d.asError.asModule)}`);
              return;
            }
          }
          const status = result.status;
          const hash = status.isInBlock ? status.asInBlock : status.asFinalized;
          resolve(hash);
          return;
        }
        if (result.dispatchError) {
          if (result.dispatchError.isModule) {
            reject(buildErrorText(api, result.dispatchError.asModule));
            return;
          } else {
            reject(`tx: ${result.dispatchError.toString()}`);
            return;
          }
        }
        reject("tx: unknown state");
        return;
      })
      .catch(() => {
        reject("tx: failed");
        return;
      });
  });
};

export const sudo = (
  f: (tx: ApiPromise["tx"]) => SubmittableExtrinsic<"promise">,
  account: IKeyringPair
) => {
  const api = getApi();
  return tx((tx) => api.tx.sudo.sudo(f(tx)), account);
};

const buildErrorText = (api: ApiPromise, mod: DispatchErrorModule) => {
  const { docs, index, name, section } = api.registry.findMetaError(mod);
  return `tx: ${section}.${name}: (${index}) ${docs.join(" ")}`;
};

export const getRuntimeVersion = () => getApi().runtimeVersion;

export const createType = <T extends Codec = Codec, K extends string = string>(
  type: K,
  ...params: unknown[]
): DetectCodec<T, K> => registry.createType(type, ...params);

// slow, be careful
export const buildKeyringPair = (mnemonic: string) =>
  new Keyring({ type: "ed25519" }).createFromUri(mnemonic);

const createChildKey = (trieIndex: any) => {
  return u8aToHex(
    u8aConcat(
      ":child_storage:default:",
      blake2AsU8a(u8aConcat("crowdloan", trieIndex.toU8a()))
    )
  );
};
const convertToKSM = (address: any) => {
  if (!address && `${address}`.length > 0) {
    return null;
  }
  let plk = decodeAddress(address);
  return encodeAddress(plk, 2);
};
export const getDerivedStaking = async (currentWallet) => {
  const parachanID = config.parachanID;
  const api = getApi();
  const fund = await api.query.crowdloan?.funds(parachanID);
  if (fund) {
    // @ts-ignore
    const trieIndex = fund.unwrap().trieIndex;
    const childKey = createChildKey(trieIndex);
    const keys = await api.rpc.childstate.getKeys(childKey, "0x");
    const ss58Keys = keys.map((k) => encodeAddress(k, 2));
    const values = await Promise.all(
      keys.map((k) => api.rpc.childstate.getStorage(childKey, k))
    );
    let total = 0;
    let _Alltotal = 0;
    // @ts-ignore
    const contributions = values.map((v, idx) => {
      return {
        from: ss58Keys[idx],
        data: api.createType("(Balance, Vec<u8>)", v.unwrap()).toJSON(),
      };
    });
    // @ts-ignore
    let buffList: any[] = [];
    let addr;
    if (currentWallet) {
      addr = convertToKSM(currentWallet);
    }
    const len = contributions.length;
    contributions.map((val: any) => {
      let ex = false;
      buffList.map((ele, index) => {
        if (val.from === ele.from) {
          ex = true;
          buffList[index].total += Number(val.data[0]) / decimals;
          // _Alltotal += buffList[index].total;
        }
        return null;
      });
      if (!ex) {
        _Alltotal += val.data[0];
        buffList.push({ from: val.from, total: val.data[0] / decimals });
      }
      if (currentWallet && addr === val.from) {
        total += val.data[0];
      }
      return null;
    });

    // buffList = buffList.sort((a, b) => (a.total < b.total ? 1 : -1));
    return {
      count: len,
      list: buffList.length ? buffList.slice(0, 2) : [],
      alltotal: Number(`${parseFloat(`${_Alltotal / decimals}`).toFixed(2)}`),
      total: total / decimals, // DOT to Contribute
    };
    // 当前出块时间
  }
};

export type BlockId = number | string | "latest";
export interface BlockInfo {
  hash: string;
  number: string;
}
async function _getBlock(
  blockHash: BlockHash | string,
  api: ApiPromise
): Promise<BlockInfo> {
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  return {
    hash: signedBlock.block.hash.toHex(),
    number: signedBlock.block.header.number.toString(),
  };
}

async function _getBlockById(blockId: number): Promise<BlockInfo | null> {
  const api = getApi();
  const blockHash = await api.rpc.chain.getBlockHash(blockId);
  if (!blockHash.isEmpty) {
    return await _getBlock(blockHash, api);
  }
  return null;
}
export async function getBlock(blockTag: BlockId): Promise<BlockInfo | null> {
  const api = getApi();
  switch (typeof blockTag) {
    case "number":
      // get block by id sent as number
      return await _getBlockById(blockTag);
    case "string":
      if (blockTag === "latest") {
        // get latest block
        const h = await api.rpc.chain.getHeader();
        return await _getBlock(h.hash, api);
      } else if (blockTag.startsWith("0x")) {
        // get block by hash
        return await _getBlock(blockTag, api);
      } else {
        // get block by id sent as string
        const blockId = parseInt(blockTag);
        if (blockId) {
          return await _getBlockById(blockId);
        }
      }
  }
  return null;
}

export async function getAddressBalance(address: string) {
  const api = getApi();
  const account = await api.query.system.account(address);
  return Number(account.data.free.toString()) / decimals;
}

export async function contribution(val: string, address: string, fn: any) {
  try {
    const api = getApi();
    const parachanID = config.parachanID;
    const crowdloanEntrinsic = api.tx.crowdloan.contribute(
      parachanID,
      `${Number(val) * decimals}`.toString(),
      null
    );
    const unsub = await crowdloanEntrinsic.signAndSend(
      address,
      {},
      async ({ status }) => {
        if (status.isReady) {
          console.log("status.isReady: ", status.isReady);
        }
        if (status.isBroadcast) {
          console.log("status.isBroadcast: ", status.isBroadcast);
        }
        if (status.isInBlock) {
          console.log("status.isInBlock: ", status.isInBlock);
          const res = await api.rpc.chain.getBlock(status.asInBlock);
          const block = res.block.header.number.toString();
          console.log(block, status.asInBlock.toString());
          if (fn) {
            fn(block, status.asInBlock.toString());
          }
        }
        if (status.isFinalized) {
          console.log("status.isFinalized: ", status.isFinalized);
          unsub();
        }
      }
    );
  } catch (error: any) {}
  return null;
}

export const getContributeLast = async (): Promise<any> => {
  try {
    if (config.isDev) {
      const _latestBlock = await getBlock("latest");
      const response = {
        code: "200",
        data: {
          _id: "61b721348a785421cf18ee56",
          block: Number(_latestBlock.number) - 10,
          amount: "5",
          publickey:
            "0xc48f8b1d04cd6dab198aa80dc64d3001a9a1e96ffcd4604180d5e6da36102864",
          sources: "coinversation",
          address: "5GWRtDZqpfqgfvwBGBfbphqmyZM3TCPU5FDPP1gaDipjbScu",
          __v: 0,
        },
      };
      return isNaN(response?.data?.block) ? 0 : +response.data.block;
    } else {
      const response = await fetch(`/api/contribute/get/last`);
      if (response.status !== 200) {
        return null;
      }
      const contributeLast = await response.json();
      if (contributeLast.code === "200") {
        return isNaN(contributeLast?.data?.block)
          ? 0
          : +contributeLast?.data?.block;
      }
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const getContributeList = async (publickey: string): Promise<any> => {
  try {
    if (config.isDev) {
      const response = {
        code: "200",
        data: {
          list: [
            {
              _id: "61b720e68a785421cf18ee3d",
              block: "8111719",
              at: "1639391462438",
              amount: "10",
              publickey:
                "0x648604f86ca119439c59689d74a455e28d61415d0463260ae7fa59e64a9c4c69",
              sources: "coinversation",
              address: "0x0000000000000000000000000000000000000000",
              __v: 0,
            },
            {
              _id: "61b721348a785421cf18ee56",
              block: "8114659",
              at: "1639391540183",
              amount: "5",
              publickey:
                "0xc48f8b1d04cd6dab198aa80dc64d3001a9a1e96ffcd4604180d5e6da36102864",
              sources: "coinversation",
              address: "0x0000000000000000000000000000000000000000",
              __v: 0,
            },
          ],
          alltotal: 40015,
          count: 5,
          total: 0,
        },
      };
      const _data = response.data;
      return {
        count: _data.count,
        list: _data.list,
        total: _data.total,
        alltotal: _data.alltotal,
      };
    } else {
      const response = await fetch(
        `/api/contribute/get/list?publickey=${publickey}`
      );
      if (response.status !== 200) {
        return null;
      }
      const contributeLast = await response.json();
      if (contributeLast.code === "200") {
        const _data = contributeLast?.data;
        if (_data?.list.length > 0) {
          return {
            count: _data.count,
            list: _data.list,
            total: _data?.total || 0,
            alltotal: _data.alltotal,
          };
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
export const postContributeAdd = async (
  block: string,
  at: string,
  amount: string,
  publickey: string,
  sources: string,
  address: string,
  hash: string
): Promise<any> => {
  try {
    const response = await fetch(`/api/contribute/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        block: block,
        at: at,
        amount: amount,
        publickey: publickey,
        sources: sources,
        address: address,
        hash: hash,
      }),
    });
    if (response.status !== 200) {
      return null;
    }
    const signAddressRes = await response.json();
    return signAddressRes;
  } catch (error) {
    return null;
  }
};

export const getRate = async (): Promise<any> => {
  try {
    if (config.isDev) {
      return 0.174;
    } else {
      const response = await fetch(`/api/rate`);
      if (response.status !== 200) {
        return null;
      }
      const rate = await response.json();
      if (rate.code === "200") {
        return isNaN(rate?.data?.last) ? null : +rate.data.last;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const getListOfWinners = async (): Promise<any> => {
  try {
    if (config.isDev) {
      return [];
    }
    const response = await fetch(`/api/contribute/list/winners`);
    if (response.status !== 200) {
      return null;
    }
    const data = await response.json();
    if (data.code === "200") {
      return data.data;
    }
    return false;
  } catch (error) {
    return false;
  }
};
