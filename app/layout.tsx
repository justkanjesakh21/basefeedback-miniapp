import "./globals.css";
import { Providers } from "@/components/providers";
import { BottomNav } from "@/components/bottom-nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69cb289a6b6a2cd82c727ede" />
        <meta name="build:code" content="bc_b8nos5a8" />
        <meta name="build:encoded_string" content="0x62635f62386e6f733561380b0080218021802180218021802180218021" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
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
