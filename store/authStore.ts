import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  image?: string
  relationshipStatus: string
  currentStreak: number
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  updateStreak: (streak: number) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, error: null }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      updateStreak: (currentStreak) => set((state) => ({
        user: state.user ? { ...state.user, currentStreak } : null
      })),
      
      clearAuth: () => set({ user: null, error: null, isLoading: false }),
    }),
    { name: 'auth-store' }
  )
)
