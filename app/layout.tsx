import type React from "react"
import "./globals.css"
import Link from "next/link"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Historical Facts Explorer",
  description: "Discover fascinating historical facts about any location",
    generator: 'v0.dev'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
             {/* Footer with Copyright and Social Media Links */}
      <footer className="bg-slate-100 dark:bg-slate-900 py-4 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()}{" "}
          <span  className=" font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            Vansh Gupta
          </span>. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
         
         <Link href="https://x.com/Vanshreads" target="_blank">
           <FaTwitter className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-all duration-300" />
         </Link>
         <Link href="https://www.instagram.com/vansh_reads/" target="_blank">
           <FaInstagram className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-pink-500 transition-all duration-300" />
         </Link>
         <Link href="https://www.linkedin.com/in/vansh-gupta-598801204" target="_blank">
           <FaLinkedin className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-blue-700 transition-all duration-300" />
         </Link>
       </div>
       
      </footer>
      </body>
    </html>
  )
}



import './globals.css'