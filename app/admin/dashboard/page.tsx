import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, FileText, Briefcase, BarChart } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      title: "Total Clients",
      value: "24",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Employees",
      value: "12",
      icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Requests",
      value: "18",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completion Rate",
      value: "94%",
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  const pendingRequests = [
    {
      id: "REQ-005",
      title: "Data Processing",
      client: "XYZ Corp",
      date: "2023-05-10",
      status: "Pending Assignment",
      priority: "High",
    },
    {
      id: "REQ-006",
      title: "Document Verification",
      client: "ABC Inc",
      date: "2023-05-09",
      status: "Pending Assignment",
      priority: "Medium",
    },
    {
      id: "REQ-007",
      title: "Customer Support",
      client: "DEF Ltd",
      date: "2023-05-08",
      status: "Pending Assignment",
      priority: "Urgent",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
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

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Assignments</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>Requests that need to be assigned to employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">ID</th>
                      <th className="px-4 py-2 text-left font-medium">Title</th>
                      <th className="px-4 py-2 text-left font-medium">Client</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Priority</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="px-4 py-2">{request.id}</td>
                        <td className="px-4 py-2">{request.title}</td>
                        <td className="px-4 py-2">{request.client}</td>
                        <td className="px-4 py-2">{request.date}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.priority === "Urgent"
                                ? "bg-red-100 text-red-800"
                                : request.priority === "High"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <Link href={`/admin/assign/${request.id}`}>
                            <Button variant="outline" size="sm">
                              Assign
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
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent system activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Activity log will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
