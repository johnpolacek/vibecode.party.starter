import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    // If no user is authenticated, they're not an admin
    if (!userId) {
      return NextResponse.json({ isAdmin: false });
    }
    
    // Get the list of admin user IDs from environment variables
    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || [];
    
    // Check if the current user's ID is in the admin list
    const isAdmin = adminUserIds.includes(userId);
    
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
} 