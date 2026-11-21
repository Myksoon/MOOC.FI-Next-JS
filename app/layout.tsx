import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";
import SessionProvider from "./components/SessionProvider";

export const metadata: Metadata = {
  title: "Blog app",
  description: "Full Stack Open: Next.js blog app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* no session prop: the client fetches it, so the layout doesn't read cookies and stays static */}
        <SessionProvider>
          <NotificationProvider>
            <NavBar />
            <main className="mx-auto max-w-3xl px-4 pb-8">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
