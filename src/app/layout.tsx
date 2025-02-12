"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider, useAtom } from "jotai";

import "./globals.css";
import { auth } from "@/lib/firebase";
import { authUserAtom } from "@/state/atoms";
import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

function AuthProvider({ children }: { children: ReactNode }) {
  const [, setAuthUser] = useAtom(authUserAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setAuthUser(user); // Update global state
    });
    return () => unsubscribe();
  }, [setAuthUser]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <AuthProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
            </div>
          </body>
        </html>
      </AuthProvider>
    </Provider>
  );
}
