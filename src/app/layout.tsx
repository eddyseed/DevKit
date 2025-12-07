import "@/styles/globals.css";
import { ToolProvider } from "@/context/ToolContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevKit - Powered by Nextjs",
  description: "Drive kitten cars free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToolProvider>{children}</ToolProvider>
      </body>
    </html>
  );
}
