export interface MailingListPreferences {
  marketing: boolean
  updates: boolean
}

export interface MailingListSubscription {
  id: string
  user_id: string
  email: string
  name: string | null
  subscribed_at: string
  unsubscribed_at: string | null
  preferences: MailingListPreferences
  created_at: string
  updated_at: string
}

export type CreateMailingListSubscription = Pick<MailingListSubscription, 'user_id' | 'email' | 'name'> & {
  preferences?: Partial<MailingListPreferences>
}

export type UpdateMailingListSubscription = Partial<Pick<MailingListSubscription, 'name' | 'unsubscribed_at'>> & {
  preferences?: Partial<MailingListPreferences>
} 