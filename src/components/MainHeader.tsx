"use client";
import React, { FC } from "react";

import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const MainHeader: FC<{}> = () => {
  return (
    <header className="flex w-full justify-end items-center p-2">
      <WalletMultiButtonDynamic />
    </header>
  );
};

export default MainHeader;
