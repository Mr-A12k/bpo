import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MainNav } from "@/components/main-nav"
import { FileText, Home, MessageSquare, Upload } from "lucide-react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    {
      title: "Dashboard",
      href: "/client/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Submit Request",
      href: "/client/submit-request",
      icon: <Upload className="h-4 w-4" />,
    },
    {
      title: "My Requests",
      href: "/client/requests",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/client/messages",
      icon: <MessageSquare className="h-4 w-4" />,
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
