import { setupTestDatabase } from "./utils/db-reset"

/**
 * Global setup function that runs before all tests
 */
export default async function globalSetup() {
  await setupTestDatabase()
} 