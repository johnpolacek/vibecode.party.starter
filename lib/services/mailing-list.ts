import { convex, api } from "@/lib/convex/server";
import { Doc } from "@/convex/_generated/dataModel";

export type MailingListSubscription = Doc<"mailing_list_subscriptions">;

/**
 * Retrieves all mailing list subscriptions from Convex
 */
export async function getMailingListSubscriptions(): Promise<MailingListSubscription[]> {
  try {
    return await convex.query(api.mailingList.getSubscriptions);
  } catch (error) {
    console.error('Error getting mailing list subscriptions:', error);
    return [];
  }
}

/**
 * Adds a new email subscription to the mailing list
 */
export async function addMailingListSubscription(data: { 
  userId: string, 
  email: string, 
  name?: string | undefined,
  preferences: {
    marketing: boolean,
    updates: boolean
  }
}): Promise<MailingListSubscription | null> {
  try {
    return await convex.mutation(api.mailingList.subscribe, data);
  } catch (error) {
    console.error('Error adding mailing list subscription:', error);
    return null;
  }
}

/**
 * Removes an email subscription from the mailing list
 */
export async function removeMailingListSubscription(email: string): Promise<boolean> {
  try {
    return await convex.mutation(api.mailingList.unsubscribe, { email });
  } catch (error) {
    console.error('Error removing mailing list subscription:', error);
    return false;
  }
}

/**
 * Updates preferences for a user's mailing list subscription
 */
export async function updateMailingListPreferences(userId: string, preferences: { marketing: boolean, updates: boolean }): Promise<boolean> {
  try {
    return await convex.mutation(api.mailingList.updatePreferences, { userId, preferences });
  } catch (error) {
    console.error('Error updating mailing list preferences:', error);
    return false;
  }
} 