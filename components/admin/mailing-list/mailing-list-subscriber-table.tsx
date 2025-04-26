"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Id } from "@/convex/_generated/dataModel"
import { formatDate } from "@/lib/utils"

type Subscriber = {
  id: Id<"mailing_list_subscriptions">
  userId: string
  email: string
  name: string | null
  preferences: {
    marketing: boolean
    updates: boolean
  }
  subscribedAt: string
  unsubscribedAt: string | null
  createdAt: string
  updatedAt: string
}

interface MailingListSubscriberTableProps {
  subscribers: Subscriber[]
}

export function MailingListSubscriberTable({ subscribers }: MailingListSubscriberTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Subscribed</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Preferences</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscribers.map((subscriber) => {
          return (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.name || "-"}</TableCell>
              <TableCell>{formatDate(subscriber.subscribedAt)}</TableCell>
              <TableCell>{subscriber.unsubscribedAt ? <Badge variant="destructive">Unsubscribed</Badge> : <Badge variant="default">Active</Badge>}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {subscriber.preferences.marketing && <Badge variant="outline">Marketing</Badge>}
                  {subscriber.preferences.updates && <Badge variant="outline">Updates</Badge>}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
