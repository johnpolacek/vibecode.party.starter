"use client"

import * as React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { banUser } from "@/app/_actions/ban-user"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface User {
  id: string
  email: string | undefined
  username: string | null
  firstName: string | null
  lastName: string | null
  imageUrl: string
  createdAt: string
  isAdmin: boolean
  banned: boolean
  publicMetadata?: {
    banReason?: string
  }
}

interface AdminUserListProps {
  initialUsers: User[]
}

export function AdminUserList({ initialUsers }: AdminUserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [showBanDialog, setShowBanDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [banReason, setBanReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleBanClick = (user: User) => {
    setSelectedUser(user)
    setShowBanDialog(true)
  }

  const handleBanConfirm = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      const result = await banUser(selectedUser.id, banReason)

      if (result.success) {
        // Update the local users state
        setUsers(
          users.map((user) => {
            if (user.id === selectedUser.id) {
              return {
                ...user,
                banned: !user.banned,
                publicMetadata: {
                  ...user.publicMetadata,
                  banReason: !user.banned ? banReason : undefined,
                },
              }
            }
            return user
          })
        )

        toast.success(selectedUser.banned ? "User unbanned successfully" : "User banned successfully")
        setShowBanDialog(false)
        setBanReason("")
        setSelectedUser(null)
      } else {
        toast.error("Failed to manage user ban status: " + result.error)
      }
    } catch {
      toast.error("An error occurred while managing user ban status")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string | null) => {
    if (!date) return "Never"
    return new Date(date).toLocaleDateString()
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <TableRow>
                  <TableCell>{/* Placeholder for user action button */}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} alt={user.username || ""} />
                      <AvatarFallback>
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{user.isAdmin ? <Badge>Admin</Badge> : user.banned ? <Badge variant="destructive">Banned</Badge> : <Badge variant="secondary">User</Badge>}</TableCell>
                  <TableCell>
                    {!user.isAdmin && (
                      <Button variant={user.banned ? "outline" : "destructive"} size="sm" onClick={() => handleBanClick(user)} disabled={isLoading}>
                        {user.banned ? "Unban User" : "Ban User"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedUser?.banned ? "Unban User" : "Ban User"}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.banned ? (
                <>
                  Are you sure you want to unban {selectedUser?.firstName} {selectedUser?.lastName}?
                </>
              ) : (
                <>
                  Are you sure you want to ban {selectedUser?.firstName} {selectedUser?.lastName}? This action can be undone later.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!selectedUser?.banned && (
            <div className="py-4">
              <Label htmlFor="reason">Reason for ban (optional)</Label>
              <Input id="reason" value={banReason} onChange={(e) => setBanReason(e.target.value)} placeholder="Enter reason for ban" />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowBanDialog(false)
                setBanReason("")
                setSelectedUser(null)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleBanConfirm} disabled={isLoading}>
              {selectedUser?.banned ? "Unban User" : "Ban User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
