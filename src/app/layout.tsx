import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigations/navbar";
import NavFooter from "@/components/navigations/nav-footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="min-h-screen">
          {children}
        </div>
        <NavFooter />
      </body>
    </html>
  );
}
