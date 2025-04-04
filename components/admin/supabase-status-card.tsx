"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, RefreshCw } from "lucide-react"

interface SupabaseStatus {
  success: boolean
  connection: {
    success: boolean
    message: string
    details?: {
      error?: unknown
      tables?: string[]
      count?: number
    }
  }
  environment: {
    nodeEnv: string
    supabaseUrl: string
    hasServiceKey: boolean
  }
}

export function SupabaseStatusCard() {
  const [status, setStatus] = useState<SupabaseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkStatus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/supabase-status")
      if (!response.ok) {
        throw new Error("Failed to fetch status")
      }
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Error checking Supabase status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Supabase Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 items-start">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${status.connection.success ? "bg-green-500" : "bg-destructive"}`} />
                <span className="font-medium">Status</span>
              </div>
              <span className={status.connection.success ? "text-green-500 text-sm" : "text-destructive text-sm"}>{status.connection.message}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 items-start">
              <span className="font-medium">Environment</span>
              <span className="capitalize">{status.environment.nodeEnv}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 items-start">
              <span className="font-medium">Service Key</span>
              <span>{status.environment.hasServiceKey ? "✅ Configured" : "❌ Missing"}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">Loading status...</div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkStatus} disabled={isLoading} className="w-full">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Checking..." : "Check Status"}
        </Button>
      </CardFooter>
    </Card>
  )
}
