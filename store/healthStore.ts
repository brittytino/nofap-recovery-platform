import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface HealthData {
  date: string
  mood?: number
  energy?: number
  sleep?: number
  exercise?: number
  urgeIntensity?: number
  notes?: string
}

interface HealthState {
  todayData: HealthData
  recentData: HealthData[]
  isLoading: boolean
  
  // Actions
  updateTodayData: (data: Partial<HealthData>) => void
  setRecentData: (data: HealthData[]) => void
  setLoading: (loading: boolean) => void
  clearHealthData: () => void
}

export const useHealthStore = create<HealthState>()(
  devtools(
    persist(
      (set, get) => ({
        todayData: { date: new Date().toISOString().split('T')[0] },
        recentData: [],
        isLoading: false,

        updateTodayData: (data) => set((state) => ({
          todayData: { ...state.todayData, ...data }
        })),

        setRecentData: (recentData) => set({ recentData }),

        setLoading: (isLoading) => set({ isLoading }),

        clearHealthData: () => set({
          todayData: { date: new Date().toISOString().split('T')[0] },
          recentData: [],
          isLoading: false
        }),
      }),
      { name: 'health-store' }
    ),
    { name: 'health-store' }
  )
)
