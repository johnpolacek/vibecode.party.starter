import { v } from "convex/values";
import { MutationCtx, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Type for successful responses
type SuccessResponse<T> = {
  success: true;
  data?: T;
  id?: Id<any>;
};

// Type for error responses
type ErrorResponse = {
  success: false;
  error: string;
};

// Combined response type
export type ConvexResponse<T = void> = SuccessResponse<T> | ErrorResponse;

// Helper to get current timestamp
export const getCurrentTimestamp = () => Date.now();

// Helper to create base fields for new documents
export const getBaseFields = () => ({
  createdAt: getCurrentTimestamp(),
  updatedAt: getCurrentTimestamp(),
});

// Helper to update timestamp
export const getUpdateFields = () => ({
  updatedAt: getCurrentTimestamp(),
});

// Helper for error handling
export const handleError = (error: unknown): ErrorResponse => ({
  success: false,
  error: error instanceof Error ? error.message : "Unknown error",
});

// Helper for success response
export const handleSuccess = <T>(data?: T, id?: Id<any>): SuccessResponse<T> => ({
  success: true,
  ...(data && { data }),
  ...(id && { id }),
});

// Validation helper
export const validateId = (id: Id<any>) => {
  if (!id) throw new Error("Invalid ID");
  return id;
};

// Query helper for pagination
export type PaginationOptions = {
  limit?: number;
  cursor?: string;
};

// Helper for handling pagination in queries
export const handlePagination = (
  ctx: QueryCtx,
  query: any,
  options?: PaginationOptions
) => {
  if (options?.limit) {
    query = query.take(options.limit);
  }
  if (options?.cursor) {
    query = query.continuePaginationFrom(options.cursor);
  }
  return query;
}; 