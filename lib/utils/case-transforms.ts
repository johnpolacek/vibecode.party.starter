import { camelCase, snakeCase } from 'lodash-es'

// Type transformations for TypeScript type system
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? T extends Uppercase<T>
    ? `_${Lowercase<T>}${CamelToSnakeCase<U>}`
    : `${T}${CamelToSnakeCase<U>}`
  : S

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

type TransformKeys<T, Transform extends (str: string) => string> = T extends object
  ? {
      [K in keyof T as K extends string
        ? string extends K
          ? string
          : Transform extends typeof snakeCase
            ? Uncapitalize<CamelToSnakeCase<K>>
            : Uncapitalize<SnakeToCamelCase<K>>
        : K]: T[K] extends object
        ? TransformKeys<T[K], Transform>
        : T[K]
    }
  : T

/**
 * Transforms an object's keys from camelCase to snake_case recursively
 * @deprecated Use toSnakeCase instead
 */
export function toDatabaseCase<T extends object>(obj: T): TransformKeys<T, typeof snakeCase> {
  return toSnakeCase(obj)
}

/**
 * Transforms an object's keys from snake_case to camelCase recursively
 * @deprecated Use toCamelCase instead
 */
export function toClientCase<T extends object>(obj: T): TransformKeys<T, typeof camelCase> {
  return toCamelCase(obj)
}

/**
 * Transforms an object's keys from camelCase to snake_case recursively
 */
export function toSnakeCase<T extends object>(obj: T): TransformKeys<T, typeof snakeCase> {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' ? toSnakeCase(item) : item
    ) as TransformKeys<T, typeof snakeCase>
  }

  if (obj === null || typeof obj !== 'object') {
    return obj as TransformKeys<T, typeof snakeCase>
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      snakeCase(key),
      typeof value === 'object' ? toSnakeCase(value) : value,
    ])
  ) as TransformKeys<T, typeof snakeCase>
}

/**
 * Transforms an object's keys from snake_case to camelCase recursively
 */
export function toCamelCase<T extends object>(obj: T): TransformKeys<T, typeof camelCase> {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' ? toCamelCase(item) : item
    ) as TransformKeys<T, typeof camelCase>
  }

  if (obj === null || typeof obj !== 'object') {
    return obj as TransformKeys<T, typeof camelCase>
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      camelCase(key),
      typeof value === 'object' ? toCamelCase(value) : value,
    ])
  ) as TransformKeys<T, typeof camelCase>
}

/**
 * Alias for toCamelCase, used for consistency with existing codebase
 */
export const deepToCamelCase = toCamelCase

/**
 * Type helper to convert a type from camelCase to snake_case
 * @example
 * interface UserInput {
 *   firstName: string
 *   lastName: string
 * }
 * 
 * type DatabaseUser = ToSnakeCase<UserInput>
 * // Result: { first_name: string, last_name: string }
 */
export type ToSnakeCase<T> = TransformKeys<T, typeof snakeCase>

/**
 * Type helper to convert a type from snake_case to camelCase
 * @example
 * interface DatabaseUser {
 *   first_name: string
 *   last_name: string
 * }
 * 
 * type ClientUser = ToCamelCase<DatabaseUser>
 * // Result: { firstName: string, lastName: string }
 */
export type ToCamelCase<T> = TransformKeys<T, typeof camelCase>

// Types for backward compatibility
export type Primitive = string | number | boolean | null | undefined
export type TransformableObject = { [key: string]: Transformable }
export type TransformableArray = Transformable[]
export type Transformable = Primitive | TransformableObject | TransformableArray 