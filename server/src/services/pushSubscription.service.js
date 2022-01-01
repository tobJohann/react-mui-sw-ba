import pushSubscription from '../models/pushSubscription.model'
import webPush from 'web-push'

export class PushSubscriptionService {
  static vapidKeys = {
    publicKey: 'BJK6XmZlC247q4xA27TdR67lZXp70W0xF2g_LS2m0rCerkoCNF8NVkZyUCqNaOTf2R0HXyV_hfw3ZcrDyoV2mYs',
    privateKey: 'Op7UC_gTtEno8n8mAPar0pfjTCpQCle3EpbzFJOiqaA',
  }

  static async get() {
    return await pushSubscription.find()
  }

  static async find(id) {
    return pushSubscription.findById(id)
  }

  static async findByEndpoint(endpoint) {
    return pushSubscription.findOne({endpoint})
  }

  static async store(subscription) {
    return pushSubscription.create(subscription)
  }

  static async destroy(id) {
    return pushSubscription.deleteOne({id})
  }

  static async destroyByEndpoint(endpoint) {
    return pushSubscription.deleteOne({endpoint})
  }

  static async send(subscription, data) {
    webPush.setVapidDetails('mailto:test@mail.de', this.vapidKeys.publicKey, this.vapidKeys.privateKey)
    console.log(data)
    data.options.timestamp = Date.now()
    try {
      const sendNotification = await webPush.sendNotification(subscription, JSON.stringify(data))
      return sendNotification
    }
    catch (error) {
      if (error.statusCode === 404 || error.statusCode === 410) {
        console.log('Subscription is expired')
        return this.destroyByEndpoint(subscription.endpoint)
      }
      else {
        throw error
      }
    }
  }

}