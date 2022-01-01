import {ServiceWorker} from './ServiceWorker'
import {apiPushNotification} from './api'

export class PushNotifications {

  static async getUserConsent() {
    return await window.Notification.requestPermission()
  }

  static isSupported() {
    return ServiceWorker.isSupported() && 'PushManager' in window
  }

  static async isSubscribed() {
    // TODO Change to bool
    return await ServiceWorker.getActivePushSubscriptions()
  }

  static async subscribe() {
    const serviceWorker = await ServiceWorker.getActiveWorker()
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
          'BFaY68rXmbWFtMLstrNsJD93nOLo2-IOiEJhBzDc1E_REcyiT6DEnoW7-HX9fBmPFOL27GF5f73x4rPwBcSlZNU'),
    })
    ServiceWorker.listenForPushEvents()
    return await this.saveSubscriptionOnServer(subscription)
  }

  static async saveSubscriptionOnServer(subscription) {
    subscription = JSON.stringify(subscription)
    console.log(subscription)
    try {
      apiPushNotification.subscribe(subscription)
      return {
        status: 201,
        subscription,
        message: {title: 'Subscribed', message: 'Congrats, you successfully subscribed to our Push Notifications'},
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  static async testLocalNotification(title, options) {
    if (this.isSupported() && this.isSubscribed()) {
      const serviceWorker = await ServiceWorker.getActiveWorker()
      await serviceWorker.showNotification(title, options)

    }
  }

}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
