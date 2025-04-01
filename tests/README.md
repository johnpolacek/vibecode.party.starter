# Testing with Playwright

This directory contains end-to-end tests using Playwright with database reset functionality.

## Running Tests

We keep our package.json clean with just two main test commands:

- `pnpm test` - Resets the database and runs all tests
- `pnpm pw` - Opens the Playwright UI for debugging tests

## Database Reset for Tests

The tests are configured to reset the database before running, ensuring a clean state for each test run. This is done through helper functions in `utils/test-helpers.ts`:

- `setupCleanDatabase()` - Resets the database to a clean state
- `setupSeededDatabase()` - Resets the database and seeds it with test data
- `setupAuthenticatedUser(page)` - Logs in a test user
- `teardownAuthenticatedUser(page)` - Logs out the current user

## Using the Helpers in Tests

Here's how to use the helpers in your tests:

```typescript
import { test, expect, setupCleanDatabase, setupSeededDatabase, setupAuthenticatedUser, teardownAuthenticatedUser } from './utils/test-helpers';

test.describe('My Test Suite', () => {
  // Reset the database before all tests in this describe block
  test.beforeAll(async () => {
    await setupCleanDatabase();
  });
  
  test('my test with seeded data', async ({ page }) => {
    // Seed the database with test data
    await setupSeededDatabase();
    
    // Test with seeded data...
  });
  
  test('my test with authenticated user', async ({ page }) => {
    // Reset database
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);
    
    // Test with authenticated user...
    
    // Logout after test
    await teardownAuthenticatedUser(page);
  });
});
```

## Configuration

The database reset functionality uses the Supabase client with admin privileges. Make sure your `.env.local` or `.env.test` file contains the necessary Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Test User

For authenticated tests, we use a test user with the following credentials (defined in `utils/auth-helpers.ts`):

```typescript
export const TEST_USER = {
  email: 'john.polacek@gmail.com',
  password: 'VibeParty1!',
  fullName: 'John Polacek'
};
```

Make sure this user exists in your Clerk authentication system.

## Adding More Tables

To add more tables to the reset process, modify the `resetDatabase` function in `utils/db-reset.ts`:

```typescript
export async function resetDatabase() {
  try {
    await clearCommunitySuggestions();
    // Add more table clearing functions here
    await clearAnotherTable();
    
    console.log('Database reset complete');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
}

// Add a new function for each table
export async function clearAnotherTable() {
  const { error } = await supabaseAdmin
    .from('another_table')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (error) {
    console.error('Error clearing another table:', error);
    throw error;
  }
} 