export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_visits: {
        Row: {
          id: string
          user_id: string | null
          path: string
          referrer: string | null
          timestamp: string
          created_at: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          path: string
          referrer?: string | null
          timestamp?: string
          created_at?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          path?: string
          referrer?: string | null
          timestamp?: string
          created_at?: string
          updated_at?: string
          user_agent?: string | null
        }
      }
      mailing_list_subscriptions: {
        Row: {
          id: string
          user_id: string
          email: string
          name: string | null
          subscribed_at: string
          unsubscribed_at: string | null
          preferences: {
            marketing: boolean
            updates: boolean
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          preferences?: {
            marketing: boolean
            updates: boolean
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          preferences?: {
            marketing: boolean
            updates: boolean
          }
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
