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
    return await ServiceWorker.getActivePushSubscriptions()
  }

  static async subscribe() {
    const serviceWorker = await ServiceWorker.getActiveWorker()
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
          'BJK6XmZlC247q4xA27TdR67lZXp70W0xF2g_LS2m0rCerkoCNF8NVkZyUCqNaOTf2R0HXyV_hfw3ZcrDyoV2mYs'),
    })
    await ServiceWorker.listenForPushEvents()
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

  static async sendNotification(title, options) {
    return await apiPushNotification.send(title, options)
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
