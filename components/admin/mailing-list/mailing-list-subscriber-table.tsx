"use client"

import { Database } from "@/types/supabase"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Subscriber = Database["public"]["Tables"]["mailing_list_subscriptions"]["Row"]

interface MailingListSubscriberTableProps {
  subscribers: Subscriber[]
}

export function MailingListSubscriberTable({ subscribers }: MailingListSubscriberTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => {
            const isSubscribed = subscriber.subscribed_at && !subscriber.unsubscribed_at

            return (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.name}</TableCell>
                <TableCell>
                  <Badge variant={isSubscribed ? "default" : "destructive"}>{isSubscribed ? "Subscribed" : "Unsubscribed"}</Badge>
                </TableCell>
                <TableCell>{new Date(subscriber.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
