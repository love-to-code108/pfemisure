import { Geist, Geist_Mono } from "next/font/google";
import {
  Inter,
  Playfair_Display,
  Poppins,
  Reddit_Sans
} from 'next/font/google';
import "./globals.css";
import MobileNavigationBar from "@/My-components/Mobile/mobileComponents/MobileNavigationBar";
import { Toaster } from "@/components/ui/sonner"
import DesktopNavbar from "@/My-components/Desktop/DesktopComponents/desktopNavbar";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Add the weights you need
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const redditSans = Reddit_Sans({
  subsets: ['latin'],
  variable: '--font-reddit-sans',
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pfemisure",
  description: "Advanced AN-ION Technology for everyday comfort and 360° leak protection.",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/companyLogo-light-mode.svg',
        href: '/companyLogo-light-mode.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/companyLogo-dark-mode.svg', // Change this to whatever you name your white logo!
        href: '/companyLogo-dark-mode.svg',
      }
    ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
      ${geistSans.variable} 
      ${geistMono.variable} 
      ${inter.variable} 
      ${playfair.variable} 
      ${poppins.variable} 
      ${redditSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">

        <MobileNavigationBar />
        <DesktopNavbar/>
        <main>
          {children}
          <Toaster position="top-center" richColors />
        </main>

      </body>
    </html>
  );
}
