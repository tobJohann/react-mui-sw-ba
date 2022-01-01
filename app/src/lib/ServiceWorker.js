export class ServiceWorker {
  static async register() {
    if (this.isSupported()) {
      navigator.serviceWorker.register('sw.js')
    }
    else {
      console.warn('Service Workers are not supported')
    }
  }

  static async getActiveWorker() {
    return await navigator.serviceWorker.ready
  }

  static isSupported() {
    return 'serviceWorker' in navigator
  }

  static async getActivePushSubscriptions() {
    const serviceWorker = await this.getActiveWorker()
    return serviceWorker.pushManager.getSubscription()
  }

  static async listenForPushEvents() {
    const serviceWorker = await this.getActiveWorker()
    serviceWorker.addEventListener('push', event => {
      console.log('PUSH EVENT')
      if (event.data) {
        console.log(event.data.text())
      }
      else {
        console.log('No event data')
      }
    })

  }
}