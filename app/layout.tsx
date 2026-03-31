import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BottomNav } from "@/components/bottom-nav";

const SITE_URL = "https://basefeedback-miniapp.vercel.app";
const APP_ID = "69cb26d06b6a2cd82c727edb";
const TALENT_VERIFICATION = "d0347e902b44255ff25580af81b7f843f1780cabd9fba4bad76cf77fe7701dd50bf3911f80c7e2b63e852ee65145a67ecbdd2539c7278d6219a21d01d17af8d7";
const BUILDER_CODE = "bc_rvo7lsj1";
const ENCODED_STRING = "0x62635f72766f376c736a310b0080218021802180218021802180218021";

const miniAppEmbed = {
  version: "next",
  imageUrl: `${SITE_URL}/opengraph-image`,
  button: {
    title: "Open BaseFeedback",
    action: {
      type: "launch_miniapp",
      name: "BaseFeedback",
      url: SITE_URL,
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BaseFeedback",
  description: "Submit short feedback notes to the BaseFeedback contract on Base Mainnet.",
  applicationName: "BaseFeedback",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BaseFeedback",
    description: "Submit short feedback notes to the BaseFeedback contract on Base Mainnet.",
    url: SITE_URL,
    siteName: "BaseFeedback",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "BaseFeedback",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseFeedback",
    description: "Submit short feedback notes to the BaseFeedback contract on Base Mainnet.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content={APP_ID} />
        <meta name="talentapp:project_verification" content={TALENT_VERIFICATION} />
        <meta name="build:code" content={BUILDER_CODE} />
        <meta name="build:encoded_string" content={ENCODED_STRING} />
        <meta name="fc:miniapp" content={JSON.stringify(miniAppEmbed)} />
        <meta name="fc:frame" content={JSON.stringify(miniAppEmbed)} />
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

