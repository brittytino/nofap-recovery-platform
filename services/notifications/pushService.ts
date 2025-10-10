export class PushNotificationService {
    private static instance: PushNotificationService
  
    static getInstance(): PushNotificationService {
      if (!this.instance) {
        this.instance = new PushNotificationService()
      }
      return this.instance
    }
  
    async requestPermission(): Promise<boolean> {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications')
        return false
      }
  
      if (Notification.permission === 'granted') {
        return true
      }
  
      if (Notification.permission === 'denied') {
        return false
      }
  
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
  
    async subscribeUser(): Promise<PushSubscription | null> {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return null
      }
  
      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
          ) as any
        })
  
        // Send subscription to server
        await this.sendSubscriptionToServer(subscription)
        return subscription
      } catch (error) {
        console.error('Failed to subscribe user:', error)
        return null
      }
    }
  
    async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
      try {
        await fetch('/api/notifications/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscription })
        })
      } catch (error) {
        console.error('Failed to send subscription to server:', error)
      }
    }
  
    private urlBase64ToUint8Array(base64String: string): Uint8Array {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
  
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
  
    async showNotification(title: string, options?: NotificationOptions): Promise<void> {
      const hasPermission = await this.requestPermission()
      
      if (!hasPermission) {
        return
      }
  
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready
        await registration.showNotification(title, {
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          ...options
        } as any)
      } else {
        new Notification(title, options)
      }
    }
  }
  