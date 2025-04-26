import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Define allowed table names for type safety
const ALLOWED_TABLES = ["visits", "mailing_list_subscriptions"] as const
type TableName = typeof ALLOWED_TABLES[number]

function isTestOrDevEnv() {
  return process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";
}

/**
 * Delete all documents from a table
 * This mutation should only be available in test environments
 */
export const deleteAll = mutation({
  args: { tableName: v.union(v.literal("visits"), v.literal("mailing_list_subscriptions")) },
  handler: async (ctx, args) => {
    if (!isTestOrDevEnv()) {
      throw new Error("This operation is only allowed in test or development environments");
    }
    const documents = await ctx.db.query(args.tableName).collect()
    for (const doc of documents) {
      await ctx.db.delete(doc._id)
    }
    return { success: true }
  },
})

/**
 * Count documents in a table
 * This query should only be available in test environments
 */
export const countDocuments = query({
  args: { tableName: v.union(v.literal("visits"), v.literal("mailing_list_subscriptions")) },
  handler: async (ctx, args) => {
    if (!isTestOrDevEnv()) {
      throw new Error("This operation is only allowed in test or development environments");
    }
    const documents = await ctx.db.query(args.tableName).collect()
    return documents.length
  },
})

/**
 * Seed test data for visits and mailing_list_subscriptions
 * This mutation should only be available in test environments
 */
export const seedTestData = mutation({
  args: {},
  handler: async (ctx) => {
    if (!isTestOrDevEnv()) {
      throw new Error("This operation is only allowed in test or development environments");
    }
    // Seed visits
    await ctx.db.insert("visits", {
      path: "/test-path",
      userId: "test-user",
      metadata: { test: true },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    // Seed mailing list subscriptions
    await ctx.db.insert("mailing_list_subscriptions", {
      userId: "test-user",
      email: "test@example.com",
      name: "Test User",
      preferences: { marketing: true, updates: true },
      subscribedAt: Date.now(),
      unsubscribedAt: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return { success: true };
  },
}); 