"use client"

import type React from "react"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const { isOpen, toggle } = useSidebar()

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-50 lg:hidden" onClick={toggle}>
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="border-b py-4 px-6">
            <h2 className="text-lg font-semibold">BPO Management</h2>
          </div>
          <div className="flex-1 py-4 px-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
