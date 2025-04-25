import { Timestamp } from 'firebase-admin/firestore';

type DateType<T> = T extends 'client' ? string : Timestamp;

/**
 * Base interface for all Firestore documents
 */
export interface FirestoreDocument<T extends 'client' | 'server' = 'server'> {
  id: string;
  created_at: DateType<T>;
  updated_at: DateType<T>;
}

/**
 * User visit data
 */
export interface UserVisit extends FirestoreDocument {
  user_id: string | null;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  timestamp: string; // ISO string for consistency with previous implementation
}

/**
 * Mailing list subscription data
 */
export interface BaseMailingListSubscription<T extends 'client' | 'server'> extends FirestoreDocument<T> {
  user_id: string;
  email: string;
  name: string | null;
  subscribed_at: DateType<T>;
  unsubscribed_at: DateType<T> | null;
  preferences: {
    marketing: boolean;
    updates: boolean;
  };
}

export type MailingListSubscription = BaseMailingListSubscription<'server'>;
export type ClientMailingListSubscription = BaseMailingListSubscription<'client'>;

/**
 * Common response type for Firestore operations
 */
export interface FirestoreResponse<T = any> {
  success: boolean;
  id?: string;
  error?: string;
  data?: T;
}

/**
 * Query operators type for Firestore
 */
export type FirestoreOperator = 
  | '<' 
  | '<=' 
  | '==' 
  | '!=' 
  | '>=' 
  | '>' 
  | 'array-contains' 
  | 'array-contains-any' 
  | 'in' 
  | 'not-in';

/**
 * Query parameters for Firestore
 */
export interface FirestoreQuery {
  field: string;
  operator: FirestoreOperator;
  value: any;
}

/**
 * Sort parameters for Firestore
 */
export interface FirestoreOrderBy {
  field: string;
  direction: 'asc' | 'desc';
} 