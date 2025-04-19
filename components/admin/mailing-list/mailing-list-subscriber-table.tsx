"use client"

import { MailingListSubscription } from "@/lib/services/mailing-list"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MailingListSubscriberTableProps {
  subscribers: MailingListSubscription[]
}

export function MailingListSubscriberTable({ subscribers }: MailingListSubscriberTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Subscribed At</TableHead>
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
              <TableCell>{new Date(subscriber.subscribedAt).toLocaleDateString()}</TableCell>
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
