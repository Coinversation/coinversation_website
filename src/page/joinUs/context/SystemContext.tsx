import React, { useEffect, useRef, useState } from "react";
import { RpcCore } from "@polkadot/rpc-core";
import { RpcInterface } from "@polkadot/rpc-core/types";
import { WsProvider } from "@polkadot/rpc-provider";
import { ProviderInterface } from "@polkadot/rpc-provider/types";
import { Text, TypeRegistry } from "@polkadot/types";
import {
  BlockHash,
  ChainProperties,
  Header,
  Health,
} from "@polkadot/types/interfaces";
import { Codec } from "@polkadot/types/types";
import { logger } from "@polkadot/util";
import { combineLatest, interval, merge, MonoTypeOperatorFunction } from "rxjs";
import { distinctUntilChanged, filter, switchMap, take } from "rxjs/operators";
import { providerConnected } from "../utils/utils";

function distinctCodecChanged<T extends Codec>(): MonoTypeOperatorFunction<T> {
  return distinctUntilChanged<T>((x, y) => x.eq(y));
}

export interface SystemContextType {
  chain?: Text;
  genesisHash?: BlockHash;
  header?: Header;
  health?: Health;
  isSystemReady: boolean;
  name?: Text;
  properties?: ChainProperties;
  version?: Text;
}
const l = logger("system-context");

export const SystemContext: React.Context<SystemContextType> =
  React.createContext({} as SystemContextType);

export interface SystemContextProviderProps {
  children?: React.ReactElement;
  provider?: string;
}

export function SystemContextProvider(
  props: SystemContextProviderProps
): React.ReactElement {
  const { children = null, provider } = props;
  const [chain, setChain] = useState<Text>();
  const [genesisHash, setGenesisHash] = useState<BlockHash>();
  const [header, setHeader] = useState<Header>();
  const [health, setHealth] = useState<Health>();
  const [name, setName] = useState<Text>();
  const [properties, setProperties] = useState<ChainProperties>();
  const [version, setVersion] = useState<Text>();
  const registryRef = useRef(new TypeRegistry());
  const [rpc, setRpc] = useState<RpcCore & RpcInterface>();
  useEffect(() => {
    // When we change provider, reset everything
    setChain(undefined);
    setGenesisHash(undefined);
    setHeader(undefined);
    setHealth(undefined);
    setName(undefined);
    setProperties(undefined);
    setVersion(undefined);
    if (!provider) {
      return;
    }
  }, [provider]);
  // useEffect(() => {
  //   if (!provider || !rpc) {
  //     return;
  //   }

  //   const sub = providerConnected(provider)
  //     .pipe(
  //       filter((connected) => !!connected),
  //       switchMap(() =>
  //         combineLatest([
  //           rpc.system.chain(),
  //           rpc.chain.getBlockHash(0),
  //           rpc.system.name(),
  //           rpc.system.properties(),
  //           rpc.system.version(),
  //         ])
  //       ),
  //       take(1)
  //     )
  //     .subscribe(([_chain, _genesisHash, _name, _properties, _version]) => {
  //       l.log(
  //         `Rpc connected to chain "${_chain}" with properties ${JSON.stringify(
  //           _properties
  //         )} via ${
  //           provider instanceof WsProvider
  //             ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //               // @ts-ignore WsProvider.endpoint is private, but we still use it
  //               // here, to have a nice log
  //               provider.endpoint
  //             : provider.constructor.name
  //         }`
  //       );

  //       setChain(_chain);
  //       setGenesisHash(_genesisHash);
  //       setName(_name);
  //       setProperties(_properties);
  //       setVersion(_version);
  //     });

  //   return (): void => sub.unsubscribe();
  // }, [provider, rpc]);

  // useEffect(() => {
  //   if (!provider || !rpc) {
  //     return;
  //   }

  //   const sub = providerConnected(provider)
  //     .pipe(
  //       filter((connected) => !!connected),
  //       switchMap(() =>
  //         combineLatest([
  //           merge(
  //             rpc.chain.subscribeNewHeads(),
  //             // Header doesn't get updated when doing a major sync, so we also poll
  //             interval(2000).pipe(switchMap(() => rpc.chain.getHeader()))
  //           ).pipe(distinctCodecChanged()),
  //           interval(2000).pipe(
  //             switchMap(() => rpc.system.health()),
  //             distinctCodecChanged()
  //           ),
  //         ])
  //       )
  //     )
  //     .subscribe(([_header, _health]) => {
  //       setHeader(_header);
  //       setHealth(_health);
  //     });

  //   return (): void => sub.unsubscribe();
  // }, [provider, rpc]);

  return (
    <SystemContext.Provider
      value={{
        chain,
        genesisHash,
        header,
        health,
        isSystemReady: !!(
          chain &&
          genesisHash &&
          header &&
          health &&
          name &&
          properties &&
          version
        ),
        name,
        properties,
        version,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}
