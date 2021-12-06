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
  if (!address) {
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
    console.log(111);
    // @ts-ignore

    const trieIndex = fund.unwrap().trieIndex;
    const childKey = createChildKey(trieIndex);
    const keys = await api.rpc.childstate.getKeys(childKey, "0x");
    const ss58Keys = keys.map((k) => encodeAddress(k, 2));
    const values = await Promise.all(
      keys.map((k) => api.rpc.childstate.getStorage(childKey, k))
    );
    let total = 0;
    // @ts-ignore
    const contributions = values.map((v, idx) => ({
      from: ss58Keys[idx],
      data: api.createType("(Balance, Vec<u8>)", v.unwrap()).toJSON(),
    }));
    // @ts-ignore
    let buffList: any[] = [];
    const addr = convertToKSM(currentWallet);
    const len = contributions.length;
    contributions.map((val: any) => {
      let ex = false;
      buffList.map((ele, index) => {
        if (val.from === ele.from) {
          ex = true;
          buffList[index].total += Number(val.data[0]) / 10000000000;
        }
        return null;
      });
      if (!ex) {
        buffList.push({ from: val.from, total: val.data[0] / 10000000000 });
      }
      if (currentWallet && addr === val.from) {
        total += val.data[0];
      }
      return null;
    });
    buffList = buffList.sort((a, b) => (a.total < b.total ? 1 : -1));
    return {
      count: len,
      list: buffList.slice(0, 2),
      total: total / 10000000000, // DOT to Contribute
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
