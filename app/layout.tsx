import "./globals.css";
import "./theme-config.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import NavBar from "./NavBar";
import AuthProvider from "./api/auth/Provider";
import ReactQueryClientProvider from "./ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue tracker",
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
        <ReactQueryClientProvider>
          <AuthProvider>
            <Theme accentColor="green" panelBackground="solid" radius="large">
              <NavBar />
              <main className="mx-4 mt-10">{children}</main>
            </Theme>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
