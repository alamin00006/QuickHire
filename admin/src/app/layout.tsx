import type { Metadata } from "next";
import "./globals.css";
import ThemProviders from "./providers";
import Providers from "@/redux/provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemProviders>{children}</ThemProviders>
        </Providers>
        <Toaster position="top-right" reverseOrder={false} />{" "}
      </body>
    </html>
  );
}
