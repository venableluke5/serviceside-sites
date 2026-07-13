import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slater Heating | Heating and HVAC Service in Central Maine",
  description:
    "Heating service, cleanings, and equipment work for Central Maine homes.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
