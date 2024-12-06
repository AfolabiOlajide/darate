import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/lib/constants";
import { NextUIProvider } from "@nextui-org/react";
import Nav from "@/components/Nav";
import NavigationTab from "@/components/NavigationTab";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "sonner";

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
                className={`${inter.className} ${merriweather.variable} w-full min-h-screen bg-gray-950 text-white`}
            >
                <Toaster richColors position="top-right" />
                <NextUIProvider>
                    <ThirdwebProvider>
                        <main>
                            <div className="main-content relative z-[1]">
                                <Nav />
                                {children}
                            </div>
                            <div className="nav-tab relative z-[3]">
                                <NavigationTab />
                            </div>
                        </main>
                    </ThirdwebProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
