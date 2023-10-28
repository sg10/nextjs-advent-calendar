import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Advent Calendar",
    template: `%s - Advent Calendar`,
  },
  description: "Your advent calendar for this year.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="relative flex flex-col h-screen">
          <main className="container mx-auto max-w-lg pt-16 px-6 flex-grow">
            {children}
          </main>
          <footer className="w-full flex items-center justify-center py-3">
            <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://www.github.com/sg10"
              title="sg10 on GitHub"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">sg10</p>
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
