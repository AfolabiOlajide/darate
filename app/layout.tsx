import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/lib/constants";
import { NextUIProvider } from "@nextui-org/react";
import Nav from "@/components/Nav";
import NavigationTab from "@/components/NavigationTab";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-merriweather",
});

export const metadata: Metadata = {
    title: `${APP_TITLE}`,
    description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} ${merriweather.variable} w-full min-h-screen bg-black text-white`}
            >
                <NextUIProvider>
                    <main>
                        <Nav />
                        {children}
                        <NavigationTab />
                    </main>
                </NextUIProvider>
            </body>
        </html>
    );
}
