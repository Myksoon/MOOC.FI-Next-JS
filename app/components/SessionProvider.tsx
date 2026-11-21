"use client";

// next-auth's provider uses context, so it needs a client boundary to be used in the layout
export { SessionProvider as default } from "next-auth/react";
