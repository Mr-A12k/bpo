import { NextResponse } from "next/server"
import { assignTask } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { employeeId } = await request.json()

    if (!employeeId) {
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 })
    }

    // Assign the task in the database
    await assignTask(params.id, employeeId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Task assignment error:", error)
    return NextResponse.json({ error: "Failed to assign task" }, { status: 500 })
  }
}
