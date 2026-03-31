import type { Abi, Address } from "viem";

export const APP_NAME = "BaseFeedback";
export const APP_DESCRIPTION = "Send a short note straight to the BaseFeedback contract.";
export const CONTRACT_ADDRESS = "0xb0bb1588145ff42eaf8b0ff299896084e344c5c9" as Address;
export const CHAIN_ID = 8453;
export const NETWORK_NAME = "Base Mainnet";
export const MAX_FEEDBACK_LENGTH = 200;

export const contractAbi = [
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "submit",
    inputs: [{ name: "message", type: "string" }],
    outputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "count",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const satisfies Abi;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

