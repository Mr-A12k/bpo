"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/sidebar-provider"

interface MainNavProps {
  links: {
    title: string
    href: string
    icon?: React.ReactNode
  }[]
}

export function MainNav({ links }: MainNavProps) {
  const pathname = usePathname()
  const { isOpen } = useSidebar()

  return (
    <nav className="grid gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === link.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {link.icon}
          {isOpen && <span>{link.title}</span>}
        </Link>
      ))}
    </nav>
  )
}
