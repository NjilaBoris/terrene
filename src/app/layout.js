import { Manrope, DM_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

const manRope = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Serrene",
  description: "An Awarrrd website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manRope.className} ${dmMono.variable} antialiased`}>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
