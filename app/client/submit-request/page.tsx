"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function SubmitRequest() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [type, setType] = useState("data-processing")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would upload the file and submit the form data
      // const formData = new FormData()
      // formData.append("title", title)
      // formData.append("description", description)
      // formData.append("priority", priority)
      // formData.append("type", type)
      // if (file) formData.append("file", file)

      // const response = await fetch("/api/client/requests", {
      //   method: "POST",
      //   body: formData,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Request submitted successfully",
        description: "Your request has been submitted and will be processed shortly.",
      })

      router.push("/client/requests")
    } catch (error) {
      toast({
        title: "Failed to submit request",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Submit New Request</h2>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Provide details about your service request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your request"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Request Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data-processing">Data Processing</SelectItem>
                  <SelectItem value="document-verification">Document Verification</SelectItem>
                  <SelectItem value="customer-support">Customer Support</SelectItem>
                  <SelectItem value="data-entry">Data Entry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about your request"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attach File (Optional)</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => {
                  const files = e.target.files
                  if (files && files.length > 0) {
                    setFile(files[0])
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">Upload any relevant documents or data files (max 10MB)</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
