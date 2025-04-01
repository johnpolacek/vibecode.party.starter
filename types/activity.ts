// Types for activity updates and comments
export interface Comment {
  id: string
  content: string
  user: {
    name: string
    avatar: string
  }
  createdAt: string
}

export interface ActivityUpdate {
  id: string
  content: string
  createdAt: string
  user: {
    name: string
    username: string
    avatar: string
    role: string
  }
  hackathon: {
    title: string
    slug: string
  }
  comments: Array<{
    id: string
    content: string
    createdAt: string
    user: {
      name: string
      avatar: string
    }
  }>
}

// Service types
export interface ActivityUpdateWithUser {
  id: string
  content: string
  created_at: string
  updated_at: string
  participant: {
    name: string
    avatar: string
    role: string
  }
  comments: {
    id: string
    content: string
    created_at: string
    user: {
      name: string
      avatar: string
    }
  }[]
}

export interface CreateActivityUpdateInput {
  participant_id: string
  hackathon_id: string
  content: string
} 