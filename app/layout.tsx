import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";
import { ModalProvider } from "./context/ModalContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Zbuilds | Modular Luxury Redefined",
  description: "Premium architectural technology firm specializing in modular, component-based luxury construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} antialiased selection:bg-primary/30 selection:text-stone`}>
        <ModalProvider>
          <SmoothScroll>
            <Navbar />
            <ContactModal />
            {children}
          </SmoothScroll>
        </ModalProvider>
      </body>
    </html>
  );
}
