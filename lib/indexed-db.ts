// lib/indexed-db.ts - Client-side stub
// This file exists only for compatibility with existing client-side imports
// Note: Server database has been removed, this is now a stub for demo purposes

export interface User {
  id?: number
  name: string
  email: string
  password: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id?: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  category: string
  tags: string[]
  readTime: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id?: number
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

// Client-side database operations
// These will be replaced with API calls
export const db = {
  users: {
    add: async (user: Omit<User, 'id'>) => {
      console.warn('Client-side db.users.add - use API route instead')
      return user as User
    },
    where: (field: keyof User) => ({
      equals: (value: any) => ({
        first: async () => {
          console.warn('Client-side db.users.where - use API route instead')
          return null
        }
      })
    }),
    count: async () => {
      console.warn('Client-side db.users.count - use API route instead')
      return 0
    }
  },
  posts: {
    add: async (post: Omit<Post, 'id'>) => {
      console.warn('Client-side db.posts.add - use API route instead')
      return post as Post
    },
    where: (field: keyof Post) => ({
      equals: (value: any) => ({
        first: async () => {
          console.warn('Client-side db.posts.where - use API route instead')
          return null
        }
      })
    }),
    count: async () => {
      console.warn('Client-side db.posts.count - use API route instead')
      return 0
    },
    getAll: async () => {
      console.warn('Client-side db.posts.getAll - use API route instead')
      return []
    }
  },
  contactMessages: {
    add: async (message: Omit<ContactMessage, 'id'>) => {
      console.warn('Client-side db.contactMessages.add - use API route instead')
      return message as ContactMessage
    },
    getAll: async () => {
      console.warn('Client-side db.contactMessages.getAll - use API route instead')
      return []
    }
  }
}

export const initDB = async () => {
  console.log('Client-side storage (not implemented)')
}

export async function initializeDatabase() {
  console.log('Client-side database (not implemented)')
}
