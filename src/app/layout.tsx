import "@/styles/globals.css";
import { ToolProvider } from "@/context/ToolContext";
import { montserrat } from "@/lib/fonts";
import { DialogProvider } from "@/components/dialog";

export const metadata = {
  description: 'A collection of developer tools to make your life easier.',
  icons: {
    icon: '/favicon.ico',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <ToolProvider>
          <DialogProvider>
            {children}
          </DialogProvider>
        </ToolProvider>
      </body>
    </html>
  );
}
