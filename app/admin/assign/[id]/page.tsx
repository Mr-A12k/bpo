"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function AssignTask({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [employee, setEmployee] = useState("")
  const [isAssigning, setIsAssigning] = useState(false)

  // Mock data - in a real app, this would come from your API
  const requestDetails = {
    id: params.id,
    title: "Data Processing",
    client: "XYZ Corp",
    date: "2023-05-10",
    description: "Process customer data for quarterly analysis",
    priority: "High",
    status: "Pending Assignment",
  }

  const employees = [
    { id: "emp-001", name: "John Doe", department: "Data Processing", availability: "Available" },
    { id: "emp-002", name: "Jane Smith", department: "Document Verification", availability: "Busy" },
    { id: "emp-003", name: "Mike Johnson", department: "Data Processing", availability: "Available" },
    { id: "emp-004", name: "Sarah Williams", department: "Customer Support", availability: "Available" },
  ]

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAssigning(true)

    try {
      // In a real app, you would make an API call to assign the task
      // const response = await fetch(`/api/admin/assign/${params.id}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ employeeId: employee }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Task assigned successfully",
        description: `Task ${params.id} has been assigned to the selected employee.`,
      })

      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Failed to assign task",
        description: "There was an error assigning the task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAssigning(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Assign Task</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Information about the request to be assigned</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Request ID</p>
              <p className="text-sm text-muted-foreground">{requestDetails.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Client</p>
              <p className="text-sm text-muted-foreground">{requestDetails.client}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Date Submitted</p>
              <p className="text-sm text-muted-foreground">{requestDetails.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Priority</p>
              <p className="text-sm text-muted-foreground">{requestDetails.priority}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Title</p>
            <p className="text-sm text-muted-foreground">{requestDetails.title}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Description</p>
            <p className="text-sm text-muted-foreground">{requestDetails.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <form onSubmit={handleAssign}>
          <CardHeader>
            <CardTitle>Assign to Employee</CardTitle>
            <CardDescription>Select an employee to handle this request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Select Employee</Label>
                <Select value={employee} onValueChange={setEmployee} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} - {emp.department} ({emp.availability})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={!employee || isAssigning}>
              {isAssigning ? "Assigning..." : "Assign Task"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
