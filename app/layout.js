"use client";
import "./globals.css";
import TopNav from "@/components/TopNav";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "@/context/search";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SearchProvider>
            <Toaster />
            <TopNav />
            {children}
          </SearchProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
