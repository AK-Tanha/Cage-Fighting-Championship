import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-oswald' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
    title: "CFC | Cage Fighting Championship",
    description: "The global leader in elite MMA competition.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* FontAwesome */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body className={`${oswald.variable} ${inter.variable} font-sans min-h-screen flex flex-col bg-black text-white`}>
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
