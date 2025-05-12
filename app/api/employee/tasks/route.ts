import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // In a real app, you would extract the employee ID from the session/JWT
    const employeeId = "employee_123"

    // In a real app, you would query the database for the employee's tasks
    // const tasks = await db.query('SELECT * FROM tasks WHERE assignedToId = ?', [employeeId])

    // Mock data
    const tasks = [
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
    ]

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Task retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve tasks" }, { status: 500 })
  }
}
