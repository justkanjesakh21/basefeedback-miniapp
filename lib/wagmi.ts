"use client";

import * as OxHex from "ox/Hex";
import { QueryClient } from "@tanstack/react-query";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import type { Hex } from "viem";

const BUILDER_CODE = "bc_rvo7lsj1";
const ENCODED_STRING = "0x62635f72766f376c736a310b0080218021802180218021802180218021";

function parseDataSuffix(value: string): Hex {
  OxHex.assert(value, { strict: true });
  return value as Hex;
}

export const dataSuffix = parseDataSuffix(ENCODED_STRING);

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "BaseFeedback",
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

export const appAttribution = {
  builderCode: BUILDER_CODE,
  encodedString: ENCODED_STRING,
  dataSuffix,
} as const;

export const queryClient = new QueryClient();


