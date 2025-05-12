import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MainNav } from "@/components/main-nav"
import { Briefcase, CheckSquare, Home, MessageSquare, Users } from "lucide-react"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    {
      title: "Dashboard",
      href: "/employee/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "My Tasks",
      href: "/employee/tasks",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Completed Tasks",
      href: "/employee/completed",
      icon: <CheckSquare className="h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/employee/messages",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Clients",
      href: "/employee/clients",
      icon: <Users className="h-4 w-4" />,
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
