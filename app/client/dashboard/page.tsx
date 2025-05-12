import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ClientDashboard() {
  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      title: "Total Requests",
      value: "12",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "In Progress",
      value: "4",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completed",
      value: "7",
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Pending",
      value: "1",
      icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  const recentRequests = [
    {
      id: "REQ-001",
      title: "Data Processing",
      date: "2023-05-10",
      status: "In Progress",
      assignedTo: "John Doe",
    },
    {
      id: "REQ-002",
      title: "Document Verification",
      date: "2023-05-08",
      status: "Completed",
      assignedTo: "Jane Smith",
    },
    {
      id: "REQ-003",
      title: "Customer Support",
      date: "2023-05-05",
      status: "Completed",
      assignedTo: "Mike Johnson",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Client Dashboard</h2>
        <Link href="/client/submit-request">
          <Button>Submit New Request</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Requests</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Your most recent service requests and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">ID</th>
                      <th className="px-4 py-2 text-left font-medium">Title</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Assigned To</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="px-4 py-2">{request.id}</td>
                        <td className="px-4 py-2">{request.title}</td>
                        <td className="px-4 py-2">{request.date}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : request.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{request.assignedTo}</td>
                        <td className="px-4 py-2">
                          <Link href={`/client/requests/${request.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Requests</CardTitle>
              <CardDescription>Complete history of your service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View all your historical requests here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
