import type React from "react"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/sidebar-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BPO Management System",
  description: "Task management system for BPO operations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
