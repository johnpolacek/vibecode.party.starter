import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the base fields that all documents will have
const baseFields = {
  createdAt: v.number(), // Unix timestamp
  updatedAt: v.number(), // Unix timestamp
};

// Define your schema
export default defineSchema({
  visits: defineTable({
    path: v.string(),
    userId: v.union(v.string(), v.null()),
    metadata: v.any(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_path", ["path"])
    .index("by_created", ["createdAt"]),

  mailing_list_subscriptions: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    preferences: v.object({
      marketing: v.boolean(),
      updates: v.boolean(),
    }),
    subscribedAt: v.number(),
    unsubscribedAt: v.union(v.number(), v.null()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"])
    .index("by_user", ["userId"])
    .index("by_subscribed", ["subscribedAt"]),
}); 