"use client"

import { useState } from "react"
import { unsubscribe } from "@/app/_actions/mailing-list"
import { Button } from "@/components/ui/button"

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus("idle")
    setError(null)
    try {
      const result = await unsubscribe(email)
      if (result.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setError(result.error || "Could not unsubscribe. Please check your email.")
      }
    } catch (err: unknown) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Could not unsubscribe. Please try again.")
    }
  }

  return (
    <>
      {status === "success" ? (
        <div className="text-center text-green-600 font-semibold py-6">You have been unsubscribed from our mailing list.</div>
      ) : (
        <form onSubmit={handleUnsubscribe} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email address
            </label>
            <input id="email" type="email" className="w-full border rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <Button type="submit" className="w-full" size="lg" variant="destructive">
            Unsubscribe
          </Button>
          {status === "error" && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
        </form>
      )}
    </>
  )
}
