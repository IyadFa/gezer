import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/app/components/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Rick & Morty API Task",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </html>
  );
}
