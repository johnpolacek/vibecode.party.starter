import { convex, api } from "@/lib/convex/server";

/**
 * Records a new visit to a page
 */
export async function recordVisit(data: {
  path: string;
  userId: string | null;
  metadata: Record<string, unknown>;
}) {
  return await convex.mutation(api.visits.recordVisit, data);
}

/**
 * Gets visits for a specific user
 */
export async function getVisitsByUser(userId: string | null, limit?: number) {
  return await convex.query(api.visits.getVisits, { userId, limit });
}

/**
 * Gets visits for a specific path
 */
export async function getVisitsByPath(path: string, limit?: number) {
  return await convex.query(api.visits.getVisitsByPath, { path, limit });
}

/**
 * Gets all visits
 */
export async function getAllVisits(limit?: number) {
  return await convex.query(api.visits.getVisits, { limit });
} 