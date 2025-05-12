"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

type SidebarContextType = {
  isOpen: boolean
  toggle: () => void
  userRole: "client" | "employee" | "admin" | null
  setUserRole: (role: "client" | "employee" | "admin" | null) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [userRole, setUserRole] = React.useState<"client" | "employee" | "admin" | null>(null)
  const pathname = usePathname()

  // Close sidebar on mobile when route changes
  React.useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }, [pathname])

  const toggle = React.useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return <SidebarContext.Provider value={{ isOpen, toggle, userRole, setUserRole }}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
