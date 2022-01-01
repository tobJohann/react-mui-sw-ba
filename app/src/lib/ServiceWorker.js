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
  
  static listenForPushEvents() {
    // Todo Listen for Push events
  }
}