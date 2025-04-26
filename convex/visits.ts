import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Schema is defined in schema.ts
export type Visit = {
  path: string;
  userId: string | null;
  metadata: Record<string, any>;
  createdAt: number;
  updatedAt: number;
};

export const recordVisit = mutation({
  args: {
    path: v.string(),
    userId: v.union(v.string(), v.null()),
    metadata: v.any(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("visits", {
      path: args.path,
      userId: args.userId,
      metadata: args.metadata,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getVisits = query({
  args: {
    userId: v.optional(v.union(v.string(), v.null())),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = args.userId !== undefined
      ? await ctx.db
          .query("visits")
          .withIndex("by_user", (q) => q.eq("userId", args.userId as string | null))
          .collect()
      : await ctx.db
          .query("visits")
          .withIndex("by_created")
          .collect();

    return args.limit !== undefined ? query.slice(0, args.limit) : query;
  },
});

export const getVisitsByPath = query({
  args: {
    path: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("visits")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .collect();

    return args.limit !== undefined ? results.slice(0, args.limit) : results;
  },
});

export const deleteVisit = mutation({
  args: { id: v.id("visits") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
}); 