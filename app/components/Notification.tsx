"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { notification } = useNotification();
  if (!notification) return null;

  const colors =
    notification.type === "success"
      ? "border-green-600 bg-green-50 text-green-800"
      : "border-red-600 bg-red-50 text-red-800";
  return (
    <div data-testid="notification" role="status" className={`mb-4 rounded border-l-4 px-4 py-2 ${colors}`}>
      {notification.message}
    </div>
  );
}
