import { NextResponse } from "next/server"
import { updateTaskStatus } from "@/lib/db"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // Update the task status in the database
    await updateTaskStatus(params.id, status)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Task status update error:", error)
    return NextResponse.json({ error: "Failed to update task status" }, { status: 500 })
  }
}
