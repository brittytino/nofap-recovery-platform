// localStorage-based notification system
// No email or push notifications - all notifications stored in browser

export interface LocalNotification {
  id: string
  type: 'morning' | 'midday' | 'evening' | 'milestone' | 'achievement' | 'reminder'
  title: string
  message: string
  read: boolean
  createdAt: string
}

const STORAGE_KEY = 'recovery_notifications'
const MAX_NOTIFICATIONS = 50

export function getNotifications(): LocalNotification[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addNotification(notification: Omit<LocalNotification, 'id' | 'createdAt' | 'read'>) {
  if (typeof window === 'undefined') return

  const notifications = getNotifications()
  const newNotification: LocalNotification = {
    ...notification,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false
  }

  // Add new notification at the beginning
  notifications.unshift(newNotification)

  // Keep only the latest MAX_NOTIFICATIONS
  const trimmed = notifications.slice(0, MAX_NOTIFICATIONS)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))

  // Show browser notification if permitted
  showBrowserNotification(newNotification.title, newNotification.message)
}

export function markAsRead(id: string) {
  if (typeof window === 'undefined') return

  const notifications = getNotifications()
  const updated = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function markAllAsRead() {
  if (typeof window === 'undefined') return

  const notifications = getNotifications()
  const updated = notifications.map(n => ({ ...n, read: true }))

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getUnreadCount(): number {
  const notifications = getNotifications()
  return notifications.filter(n => !n.read).length
}

export function clearAllNotifications() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

function showBrowserNotification(title: string, body: string) {
  if (typeof window === 'undefined') return

  // Check if browser supports notifications
  if (!('Notification' in window)) return

  // Check permission
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png'
    })
  } else if (Notification.permission !== 'denied') {
    // Request permission
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/icons/icon-192x192.png'
        })
      }
    })
  }
}

// Schedule notifications based on user preferences
export function scheduleNotifications(preferences: {
  morningMotivation: boolean
  morningTime: string
  midDayReminder: boolean
  midDayTime: string
  eveningReflection: boolean
  eveningTime: string
}) {
  if (typeof window === 'undefined') return

  // Clear existing timers
  const existingTimers = JSON.parse(localStorage.getItem('notification_timers') || '[]')
  existingTimers.forEach((timerId: number) => clearTimeout(timerId))

  const timers: number[] = []

  // Schedule morning notification
  if (preferences.morningMotivation) {
    const timer = scheduleNotificationAt(preferences.morningTime, {
      type: 'morning',
      title: 'Good Morning! 🌅',
      message: 'Start your day strong. Remember your goals and stay focused!'
    })
    if (timer) timers.push(timer)
  }

  // Schedule midday notification
  if (preferences.midDayReminder) {
    const timer = scheduleNotificationAt(preferences.midDayTime, {
      type: 'midday',
      title: 'Midday Check-In 📊',
      message: 'How\'s your day going? Take a moment to check in and log your progress.'
    })
    if (timer) timers.push(timer)
  }

  // Schedule evening notification
  if (preferences.eveningReflection) {
    const timer = scheduleNotificationAt(preferences.eveningTime, {
      type: 'evening',
      title: 'Evening Reflection 🌙',
      message: 'Reflect on your day. What went well? What can you improve tomorrow?'
    })
    if (timer) timers.push(timer)
  }

  localStorage.setItem('notification_timers', JSON.stringify(timers))
}

function scheduleNotificationAt(
  time: string, 
  notification: Omit<LocalNotification, 'id' | 'createdAt' | 'read'>
): number | null {
  try {
    const [hours, minutes] = time.split(':').map(Number)
    const now = new Date()
    const scheduled = new Date()
    scheduled.setHours(hours, minutes, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (scheduled <= now) {
      scheduled.setDate(scheduled.getDate() + 1)
    }

    const delay = scheduled.getTime() - now.getTime()

    return window.setTimeout(() => {
      addNotification(notification)
      // Reschedule for next day
      scheduleNotificationAt(time, notification)
    }, delay)
  } catch {
    return null
  }
}

