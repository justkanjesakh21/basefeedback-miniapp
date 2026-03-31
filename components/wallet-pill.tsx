"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletPill() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const availableConnectors = useMemo(
    () =>
      connectors.filter(
        (connector) =>
          connector.id === "coinbaseWalletSDK" || connector.id === "injected",
      ),
    [connectors],
  );

  if (isConnected && address) {
    return (
      <div className="wallet-actions">
        <span className="wallet-pill">{shortenAddress(address)}</span>
        <button type="button" className="wallet-small" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-actions">
      {availableConnectors.map((connector) => (
        <button
          key={connector.uid}
          type="button"
          className="wallet-small"
          disabled={isPending}
          onClick={() => connect({ connector })}
        >
          {connector.name === "Injected" ? "Browser Wallet" : "Coinbase"}
        </button>
      ))}
    </div>
  );
}

