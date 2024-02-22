import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "My Jira",
  description: "Bug tracking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="light" accentColor="green" panelBackground="solid" radius="large">
          <NavBar />
          <main className="mx-4 mt-10">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
