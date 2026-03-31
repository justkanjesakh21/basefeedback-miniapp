"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, LoaderCircle, NotebookText, Radio } from "lucide-react";
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  APP_NAME,
  CHAIN_ID,
  CONTRACT_ADDRESS,
  MAX_FEEDBACK_LENGTH,
  NETWORK_NAME,
  contractAbi,
  type SubmitStatus,
} from "@/lib/contract";
import { appAttribution, dataSuffix } from "@/lib/wagmi";
import { WalletPill } from "@/components/wallet-pill";

type LocalRecord = {
  count: number;
  lastMessage: string;
  lastStatus: SubmitStatus;
  txHash?: string;
  updatedAt?: string;
};

const STORAGE_KEY = "basefeedback:last-record";

function readLocalRecord(): LocalRecord {
  if (typeof window === "undefined") {
    return { count: 0, lastMessage: "", lastStatus: "idle" };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, lastMessage: "", lastStatus: "idle" };
    return JSON.parse(raw) as LocalRecord;
  } catch {
    return { count: 0, lastMessage: "", lastStatus: "idle" };
  }
}

function saveLocalRecord(record: LocalRecord) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function getStatusMessage(status: SubmitStatus, errorText?: string) {
  if (status === "submitting") return "Submitting to Base Mainnet...";
  if (status === "success") return "Feedback saved onchain.";
  if (status === "error") return errorText || "Transaction was not completed.";
  return "Ready when you are.";
}

function parseError(error: unknown) {
  const fallback = "Something went wrong while sending your feedback.";
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error instanceof Error) {
    if (error.message.includes("User rejected")) return "Transaction was rejected.";
    if (error.message.includes("Too long")) return "Your message is over 200 characters.";
    return error.message;
  }
  return fallback;
}

export function FeedbackHome() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorText, setErrorText] = useState("");
  const [localRecord, setLocalRecord] = useState<LocalRecord>({
    count: 0,
    lastMessage: "",
    lastStatus: "idle",
  });

  const { address, chainId, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const trimmed = message.trim();
  const countValue = trimmed.length;
  const isInvalid = countValue === 0 || countValue > MAX_FEEDBACK_LENGTH;

  const { data: totalCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "count",
  });

  const {
    data: hash,
    isPending: isWriting,
    error: writeError,
    reset,
    writeContract,
  } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: { enabled: Boolean(hash) },
  });

  useEffect(() => {
    setLocalRecord(readLocalRecord());
  }, []);

  useEffect(() => {
    if (writeError) {
      const nextError = parseError(writeError);
      setErrorText(nextError);
      setStatus("error");
    }
  }, [writeError]);

  useEffect(() => {
    if (receipt.isPending) {
      setStatus("submitting");
      return;
    }

    if (receipt.isSuccess && hash) {
      const nextRecord: LocalRecord = {
        count: localRecord.count + 1,
        lastMessage: trimmed,
        lastStatus: "success",
        txHash: hash,
        updatedAt: new Date().toISOString(),
      };
      saveLocalRecord(nextRecord);
      setLocalRecord(nextRecord);
      setStatus("success");
      setErrorText("");
      setMessage("");
      reset();
    }

    if (receipt.isError) {
      const nextError = parseError(receipt.error);
      setErrorText(nextError);
      setStatus("error");
    }
  }, [
    hash,
    localRecord.count,
    receipt.error,
    receipt.isError,
    receipt.isPending,
    receipt.isSuccess,
    reset,
    trimmed,
  ]);

  const latestStatusText = useMemo(() => getStatusMessage(status, errorText), [errorText, status]);

  async function handleSubmit() {
    if (!address || !trimmed || trimmed.length > MAX_FEEDBACK_LENGTH) return;

    setErrorText("");
    setStatus("submitting");

    try {
      if (chainId !== CHAIN_ID) {
        await switchChainAsync({ chainId: CHAIN_ID });
      }

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "submit",
        args: [trimmed],
        account: address,
        chainId: CHAIN_ID,
        dataSuffix,
      });
    } catch (error) {
      const nextError = parseError(error);
      setErrorText(nextError);
      setStatus("error");
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Feedback Mini App</p>
          <h1 className="title">{APP_NAME}</h1>
          <p className="subtitle">Short notes. Direct submit. Built for Base.</p>
        </div>
        <WalletPill />
      </header>

      <section className="card note-pad">
        <div className="note-label">
          <span>Your note</span>
          <span className="mini-chip">
            <NotebookText size={14} />
            Input first
          </span>
        </div>

        <textarea
          value={message}
          maxLength={MAX_FEEDBACK_LENGTH}
          onChange={(event) => {
            if (status !== "idle") setStatus("idle");
            if (errorText) setErrorText("");
            setMessage(event.target.value);
          }}
          className="text-area"
          placeholder="Share what should improve..."
          aria-label="Feedback message"
        />

        <div className="meter-row">
          <span className={`meter-chip ${countValue > MAX_FEEDBACK_LENGTH ? "limit" : ""}`}>
            <Radio size={14} />
            {countValue}/{MAX_FEEDBACK_LENGTH}
          </span>
          <span className="muted">{NETWORK_NAME}</span>
        </div>

        <button
          type="button"
          className="primary-button"
          disabled={!isConnected || isInvalid || isWriting || receipt.isPending}
          onClick={() => void handleSubmit()}
        >
          {isWriting || receipt.isPending ? "Submitting..." : "Submit Feedback"}
        </button>
      </section>

      <section className="status-grid">
        <div className="card status-card">
          <h3>Total feedback</h3>
          <p className="status-value">{totalCount ? totalCount.toString() : "0"}</p>
        </div>
        <div className="card status-card">
          <h3>Attribution</h3>
          <p className="status-text">{appAttribution.builderCode}</p>
        </div>
        <div className="card status-card wide">
          <h3>Latest status</h3>
          <p className={`status-text ${status === "success" ? "success" : status === "error" ? "error" : ""}`}>
            {status === "submitting" ? <LoaderCircle size={16} style={{ verticalAlign: "text-bottom" }} /> : null}{" "}
            {status === "success" ? <CheckCircle2 size={16} style={{ verticalAlign: "text-bottom" }} /> : null}{" "}
            {status === "error" ? <CircleAlert size={16} style={{ verticalAlign: "text-bottom" }} /> : null}{" "}
            {latestStatusText}
          </p>
          <div className="feedback-preview">
            {localRecord.lastMessage || "Your latest feedback preview will appear here after a successful submit."}
          </div>
        </div>
      </section>

      <section className="card panel">
        <div className="panel-stack">
          <div>
            <h3>Quick checks</h3>
            <p className="status-text">Keep it short, connect a wallet, and stay on Base Mainnet.</p>
          </div>
          <div className="status-text">
            Contract: {CONTRACT_ADDRESS}
          </div>
          <div className="status-text">
            Wallets: Coinbase Wallet and injected only.
          </div>
        </div>
      </section>
    </>
  );
}

