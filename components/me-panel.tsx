"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, ChartColumnIncreasing, Wallet } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { WalletPill } from "@/components/wallet-pill";
import { CONTRACT_ADDRESS, contractAbi } from "@/lib/contract";

type LocalRecord = {
  count: number;
  lastMessage: string;
  lastStatus: "idle" | "submitting" | "success" | "error";
  txHash?: string;
  updatedAt?: string;
};

const STORAGE_KEY = "basefeedback:last-record";

function formatWallet(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function MePanel() {
  const { address, isConnected } = useAccount();
  const [localRecord, setLocalRecord] = useState<LocalRecord>({
    count: 0,
    lastMessage: "",
    lastStatus: "idle",
  });

  const { data: totalCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "count",
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      setLocalRecord(JSON.parse(raw) as LocalRecord);
    } catch {
      setLocalRecord({ count: 0, lastMessage: "", lastStatus: "idle" });
    }
  }, []);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">My page</p>
          <h1 className="title">Profile Notes</h1>
          <p className="subtitle">A quick look at your connected wallet and latest activity.</p>
        </div>
        <WalletPill />
      </header>

      <section className="panel-stack">
        <div className="card panel">
          <h3>Connected wallet</h3>
          <p className="status-value">{formatWallet(address)}</p>
          <div className="feedback-preview">
            <Wallet size={16} style={{ verticalAlign: "text-bottom", marginRight: 8 }} />
            {isConnected ? "Ready on Base Mainnet." : "Connect Coinbase Wallet or a browser wallet to submit."}
          </div>
        </div>

        <div className="card panel">
          <h3>My submission stats</h3>
          <div className="panel-stack">
            <p className="status-text">
              <ChartColumnIncreasing size={16} style={{ verticalAlign: "text-bottom", marginRight: 8 }} />
              Local successful submissions: {localRecord.count}
            </p>
            <p className="status-text">
              <BadgeCheck size={16} style={{ verticalAlign: "text-bottom", marginRight: 8 }} />
              Contract total feedback count: {totalCount ? totalCount.toString() : "0"}
            </p>
          </div>
        </div>

        <div className="card panel">
          <h3>Last submitted feedback preview</h3>
          <div className="feedback-preview">
            {localRecord.lastMessage || "No local successful submission yet."}
          </div>
          <p className="status-text" style={{ marginTop: 12 }}>
            Last status: {localRecord.lastStatus}
            {localRecord.updatedAt ? ` • Updated ${new Date(localRecord.updatedAt).toLocaleString()}` : ""}
          </p>
        </div>
      </section>
    </>
  );
}

