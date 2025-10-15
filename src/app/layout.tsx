import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/providers/AuthProvider";
import {Toaster} from "@/components/atoms/sonner";
import {Header} from "@/components/molecules/Header";
import {RatingModal} from "@/components/molecules/RatingModal";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Viso test task",
    description: "Viso test task, recipe app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider/>
        <Header/>
        <main className='pt-16'>{children}</main>
        <RatingModal />
        <Toaster/>
        </body>
        </html>
    );
}
