import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MainNav } from "@/components/main-nav"
import { BarChart, Home, Settings, Users, FileText, Briefcase } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Employees",
      href: "/admin/employees",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Requests",
      href: "/admin/requests",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar>
        <MainNav links={links} />
      </Sidebar>
      <div className="flex-1 lg:pl-64">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}
