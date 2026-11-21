"use client";

import { createContext, use, useRef, useState } from "react";

type Notification = { message: string; type: "success" | "error" };

const NotificationContext = createContext<{
  notification: Notification | null;
  notify: (message: string, type?: Notification["type"]) => void;
} | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = (message: string, type: Notification["type"] = "success") => {
    clearTimeout(timer.current); // a new message gets its own full 5 seconds
    setNotification({ message, type });
    timer.current = setTimeout(() => setNotification(null), 5000);
  };

  return <NotificationContext value={{ notification, notify }}>{children}</NotificationContext>;
}

export function useNotification() {
  const context = use(NotificationContext);
  if (!context) throw new Error("useNotification must be used inside NotificationProvider");
  return context;
}
