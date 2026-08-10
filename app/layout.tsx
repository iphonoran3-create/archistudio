import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "Archistudio - Architecture & Design",
  description: "Architecture, conception et visualisation 3D pour donner vie à vos projets.",
  keywords: ["architecture", "design", "construction", "maison", "villa", "bâtiment", "rénovation", "3D"],
  other: {
    'font-display': 'swap',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
