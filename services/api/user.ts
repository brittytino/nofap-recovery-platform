import { User } from '@/types'

export const userAPI = {
  async getProfile(): Promise<User> {
    const response = await fetch('/api/user/profile')
    if (!response.ok) throw new Error('Failed to fetch profile')
    return response.json()
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update profile')
    return response.json()
  },

  async getStats(userId: string): Promise<any> {
    const response = await fetch(`/api/user/stats?userId=${userId}`)
    if (!response.ok) throw new Error('Failed to fetch stats')
    return response.json()
  },

  async deleteAccount(): Promise<void> {
    const response = await fetch('/api/user/profile', {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete account')
  }
}
