"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch(() => {
            // Ignore cleanup failures in development.
          });
        });
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Keep registration failure silent in the UI.
    });
  }, []);

  return null;
}
