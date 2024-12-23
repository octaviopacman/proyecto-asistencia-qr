import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "./assets/session";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asistencia QR",
  description: "Iniciar Sesión",
  icons: {
    icon: "./appicon.png",
    shortcut: "./appicon.png",
    apple: "./appicon.png",

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
