import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Montserrat, Rubik } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-montserrat',
    display: 'swap',
});
const rubik = Rubik({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-rubik',
    display: 'swap',
});

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
        <html
            lang="en"
            className={`${montserrat.variable} ${rubik.variable}`}
            suppressHydrationWarning
        >
            <head>
                {/* FontAwesome */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </head>
            <body className="font-sans antialiased min-h-screen flex flex-col bg-black text-white">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
