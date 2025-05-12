import { NextResponse } from "next/server"
import { createTask } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // In a real app, you would extract the user ID from the session/JWT
    const userId = "client_123"

    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const priority = formData.get("priority") as string
    const type = formData.get("type") as string
    const file = formData.get("file") as File | null

    // Validate inputs
    if (!title || !description || !priority || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Handle file upload if present
    let fileUrl = null
    if (file) {
      // In a real app, you would upload the file to a storage service
      // fileUrl = await uploadFile(file)
      fileUrl = "/uploads/mock-file.pdf"
    }

    // Create task in database
    const task = await createTask({
      title,
      description: `${description}${fileUrl ? `\nFile: ${fileUrl}` : ""}`,
      clientId: userId,
      status: "pending",
      priority: priority as any,
      assignedToId: null,
    })

    return NextResponse.json({ success: true, taskId: task.id })
  } catch (error) {
    console.error("Request creation error:", error)
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // In a real app, you would extract the user ID from the session/JWT
    const userId = "client_123"

    // In a real app, you would query the database for the client's requests
    // const tasks = await db.query('SELECT * FROM tasks WHERE clientId = ?', [userId])

    // Mock data
    const tasks = [
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
    ]

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Request retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve requests" }, { status: 500 })
  }
}
