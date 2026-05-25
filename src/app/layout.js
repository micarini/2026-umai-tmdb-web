import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/contexts/AppContext";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Soli - TMDB Browser",
  description: "A web application to browse movies and TV shows using The Movie Database (TMDB) API.",
  icons: {
    icon: "/soli-n.png",
    shortcut: "/soli-n.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">
          <AppContextProvider>
            {children}
            <Footer />
          </AppContextProvider>
        </body>
    </html>
  );
}
