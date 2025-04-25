import { NextResponse } from "next/server"
import { getApps, getApp } from "firebase/app"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/config"

export async function GET() {
  try {
    // Check if Firebase is initialized
    const app = getApps().length > 0 ? getApp() : null
    
    if (!app) {
      return NextResponse.json({
        success: false,
        connection: {
          success: false,
          message: "Firebase not initialized",
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "Not configured",
          hasServiceKey: Boolean(process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL),
        },
      })
    }

    // Try to connect to Firestore using singleton instance
    const testCollection = collection(db, "_test_connection")
    await getDocs(testCollection)

    return NextResponse.json({
      success: true,
      connection: {
        success: true,
        message: "Connected",
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "Not configured",
        hasServiceKey: Boolean(process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL),
      },
    })
  } catch (error) {
    console.error("Firebase status check error:", error)
    return NextResponse.json({
      success: false,
      connection: {
        success: false,
        message: "Failed to connect to Firebase",
        details: {
          error: error instanceof Error ? error.message : "Unknown error",
        },
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "Not configured",
        hasServiceKey: Boolean(process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL),
      },
    })
  }
} 