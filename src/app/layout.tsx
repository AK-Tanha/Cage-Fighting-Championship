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
    title: {
        default: "CFC | Cage Fighting Championship",
        template: "%s | CFC"
    },
    description: "The global leader in elite MMA competition. Watch the world's best fighters compete in the octagon. Live events, fighter profiles, and championship battles.",
    keywords: ["MMA", "Cage Fighting", "UFC", "Mixed Martial Arts", "Fighting Championship", "Combat Sports", "Octagon", "Fighters", "Live Events"],
    authors: [{ name: "Cage Fighting Championship" }],
    creator: "Cage Fighting Championship",
    publisher: "Cage Fighting Championship",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/favicon.ico',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Cage Fighting Championship',
        title: 'CFC | Cage Fighting Championship',
        description: 'The global leader in elite MMA competition. Watch the world\'s best fighters compete in the octagon.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Cage Fighting Championship - Elite MMA Competition',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CFC | Cage Fighting Championship',
        description: 'The global leader in elite MMA competition. Watch the world\'s best fighters compete in the octagon.',
        images: ['/og-image.jpg'],
        creator: '@CFC',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // Add your verification codes here when available
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
    },
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
