import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "BaseFeedback",
  description: "Submit short feedback notes to the BaseFeedback contract on Base Mainnet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69cb26d06b6a2cd82c727edb" />
        <meta
          name="talentapp:project_verification"
          content="d0347e902b44255ff25580af81b7f843f1780cabd9fba4bad76cf77fe7701dd50bf3911f80c7e2b63e852ee65145a67ecbdd2539c7278d6219a21d01d17af8d7"
        />
      </head>
      <body>
        <Providers>
          <main className="app-shell">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}

