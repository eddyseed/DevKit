import "@/styles/globals.css";
import { ToolProvider } from "@/context/ToolContext";
import { montserrat } from "@/lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <ToolProvider>{children}</ToolProvider>
      </body>
    </html>
  );
}
