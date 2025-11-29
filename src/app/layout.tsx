import { ToolProvider } from "@/context/ToolContext";
import "@/styles/globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "DevKit - Powered by Nextjs",
  description: "Drive kitten cars free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <ToolProvider>
          {children}
        </ToolProvider>
      </body>
    </html>
  );
}
