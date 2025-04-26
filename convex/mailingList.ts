import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import {
  ConvexResponse,
  getCurrentTimestamp,
  getBaseFields,
  handleError,
  handleSuccess,
} from "./utils";

// Types
export type MailingListSubscription = Doc<"mailing_list_subscriptions">;

// Queries
export const getSubscriptions = query({
  handler: async (ctx) => {
    try {
      return await ctx.db
        .query("mailing_list_subscriptions")
        .order("desc")
        .collect();
    } catch (error) {
      console.error("Error getting subscriptions:", error);
      throw error;
    }
  },
});

export const getSubscriptionByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    try {
      return await ctx.db
        .query("mailing_list_subscriptions")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();
    } catch (error) {
      console.error("Error getting subscription by email:", error);
      throw error;
    }
  },
});

// Mutations
export const subscribe = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    preferences: v.object({
      marketing: v.boolean(),
      updates: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    try {
      // Check if email already exists
      const existing = await ctx.db
        .query("mailing_list_subscriptions")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();

      if (existing) {
        throw new Error("Email already subscribed");
      }

      const now = Date.now();
      const subscription = {
        userId: args.userId,
        email: args.email,
        name: args.name,
        preferences: args.preferences,
        subscribedAt: now,
        unsubscribedAt: null,
        createdAt: now,
        updatedAt: now,
      };

      const id = await ctx.db.insert("mailing_list_subscriptions", subscription);
      return await ctx.db.get(id);
    } catch (error) {
      console.error("Error subscribing:", error);
      throw error;
    }
  },
});

export const unsubscribe = mutation({
  args: { 
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      console.log('[unsubscribe] Attempting to unsubscribe email:', args.email);
      const subscription = await ctx.db
        .query("mailing_list_subscriptions")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();
      console.log('[unsubscribe] Subscription found:', subscription);
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      const now = Date.now();
      await ctx.db.patch(subscription._id, {
        unsubscribedAt: now,
        updatedAt: now,
      });
      return true;
    } catch (error) {
      console.error("Error unsubscribing:", error);
      throw error;
    }
  },
});

export const deleteSubscription = mutation({
  args: { id: v.id("mailing_list_subscriptions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updatePreferences = mutation({
  args: {
    userId: v.string(),
    preferences: v.object({
      marketing: v.boolean(),
      updates: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    // Find the active subscription for this user
    const subscription = await ctx.db
      .query("mailing_list_subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!subscription || subscription.unsubscribedAt !== null) {
      throw new Error("Active subscription not found");
    }

    await ctx.db.patch(subscription._id, {
      preferences: args.preferences,
      updatedAt: Date.now(),
    });

    return true;
  },
}); 