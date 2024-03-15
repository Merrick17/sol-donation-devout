"use client";
import MainHeader from "@/components/MainHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const page = () => {
  const { connected, sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();
  const handleDonations = async () => {
    try {
      if (publicKey) {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(
              "HdPcuMsYFn8JMJxgVXmBQWD5y7bBepSrT9z8c9b82CHK"
            ),
            lamports: 0.1 * LAMPORTS_PER_SOL
          })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, "processed");
        toast({
          title: "Success",
          variant: "default",
          description: (
            <div className="flex flex-col gap-2">
              <Link
                href={`https://solscan.io/tx/${signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-2 uppercase text-sm rounded-md text-center"
              >
                View on solscan
              </Link>
            </div>
          )
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message
      });
    }
  };
  return (
    <main className="bg-black flex justify-start min-h-screen items-center flex-col">
      <MainHeader />
      <h1 className="text-2xl text-white">Solana Donations</h1>
      <p className="text-white">donate 0.1 SOL </p>
      <div className=" flex w-full justify-center items-center my-3">
        {!connected ? (
          <WalletMultiButtonDynamic />
        ) : (
          <Button
            onClick={() => {
              handleDonations();
            }}
          >
            Confirm Donation
          </Button>
        )}
      </div>
    </main>
  );
};

export default page;
