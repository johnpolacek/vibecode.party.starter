/**
 * Utilities for transforming between snake_case and camelCase
 */

/**
 * Types that can be transformed between snake_case and camelCase
 */
type Primitive = string | number | boolean | null | undefined;
type TransformableObject = { [key: string]: Transformable };
type TransformableArray = Transformable[];
type Transformable = Primitive | TransformableObject | TransformableArray;

/**
 * Converts a string from snake_case to camelCase
 */
const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Converts a string from camelCase to snake_case
 */
const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

/**
 * Recursively transforms all object properties from snake_case to camelCase
 * Handles nested objects and arrays while maintaining type safety
 */
export function toCamelCase<T>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => toCamelCase(item)) as T;
  }

  if (input !== null && typeof input === 'object') {
    const camelCaseObj: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(input)) {
      const camelKey = snakeToCamel(key);
      camelCaseObj[camelKey] = toCamelCase(value);
    }
    
    return camelCaseObj as T;
  }

  return input as T;
}

/**
 * Recursively transforms all object properties from camelCase to snake_case
 * Handles nested objects and arrays while maintaining type safety
 */
export function toSnakeCase<T>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => toSnakeCase(item)) as T;
  }

  if (input !== null && typeof input === 'object') {
    const snakeCaseObj: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(input)) {
      const snakeKey = camelToSnake(key);
      snakeCaseObj[snakeKey] = toSnakeCase(value);
    }
    
    return snakeCaseObj as T;
  }

  return input as T;
}

/**
 * Type-safe wrapper for toCamelCase that preserves the type information
 * Useful when you know the exact type you want to convert to
 * 
 * @example
 * interface UserProfile {
 *   userId: string;
 *   firstName: string;
 * }
 * const transformer = transformToCamel<UserProfile>();
 * const profile = transformer(dbData); // profile is typed as UserProfile
 */
export function transformToCamel<T>(): (data: unknown) => T {
  return (data: unknown) => toCamelCase<T>(data);
}

/**
 * Type-safe wrapper for toSnakeCase that preserves the type information
 * Useful when you know the exact type you want to convert to
 * 
 * @example
 * interface DbUserProfile {
 *   user_id: string;
 *   first_name: string;
 * }
 * const transformer = transformToSnake<DbUserProfile>();
 * const dbProfile = transformer(appData); // dbProfile is typed as DbUserProfile
 */
export function transformToSnake<T>(): (data: unknown) => T {
  return (data: unknown) => toSnakeCase<T>(data);
} 