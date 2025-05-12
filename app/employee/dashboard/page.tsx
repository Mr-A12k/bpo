import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle, BarChart } from "lucide-react"
import Link from "next/link"

export default function EmployeeDashboard() {
  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      title: "Assigned Tasks",
      value: "8",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completed Today",
      value: "3",
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Pending",
      value: "5",
      icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Efficiency",
      value: "92%",
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  const assignedTasks = [
    {
      id: "TASK-001",
      title: "Data Processing for Client XYZ",
      client: "XYZ Corp",
      dueDate: "2023-05-15",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "TASK-002",
      title: "Document Verification for Client ABC",
      client: "ABC Inc",
      dueDate: "2023-05-14",
      priority: "Medium",
      status: "Not Started",
    },
    {
      id: "TASK-003",
      title: "Customer Support for Client DEF",
      client: "DEF Ltd",
      dueDate: "2023-05-12",
      priority: "Urgent",
      status: "In Progress",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Employee Dashboard</h2>
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

      <Tabs defaultValue="assigned">
        <TabsList>
          <TabsTrigger value="assigned">Assigned Tasks</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Tasks</CardTitle>
              <CardDescription>Tasks currently assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">ID</th>
                      <th className="px-4 py-2 text-left font-medium">Title</th>
                      <th className="px-4 py-2 text-left font-medium">Client</th>
                      <th className="px-4 py-2 text-left font-medium">Due Date</th>
                      <th className="px-4 py-2 text-left font-medium">Priority</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedTasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="px-4 py-2">{task.id}</td>
                        <td className="px-4 py-2">{task.title}</td>
                        <td className="px-4 py-2">{task.client}</td>
                        <td className="px-4 py-2">{task.dueDate}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              task.priority === "Urgent"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "High"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <Link href={`/employee/tasks/${task.id}`}>
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
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks that will be assigned to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No upcoming tasks at the moment.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
