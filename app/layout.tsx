import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ? Base 必须读取到的 App ID（关键修复） */}
        <meta name="base:app_id" content="69cb289a6b6a2cd82c727ede" />

        {/* 可选但建议保留 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
