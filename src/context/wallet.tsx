"use client";

require("@solana/wallet-adapter-react-ui/styles.css");

import { Toaster } from "@/components/ui/toaster";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter
} from "@solana/wallet-adapter-wallets";
import dynamic from "next/dynamic";
import { FC, ReactNode, useMemo } from "react";

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint =
    "https://solana-mainnet.g.alchemy.com/v2/bYvXTPXDlkcg7JxAUXywhMnFHqq6oi1K";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),

      new SolflareWalletAdapter(),

      new CoinbaseWalletAdapter(),

      new Coin98WalletAdapter(),
      new LedgerWalletAdapter(),
      new TrustWalletAdapter()

      //new SlopeWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <ReactUIWalletModalProviderDynamic>
          <Toaster />
          {children}
        </ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
