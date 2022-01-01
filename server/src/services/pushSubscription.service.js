import pushSubscription from '../models/pushSubscription.model'

export class PushSubscriptionService {
  static async get() {
    return pushSubscription.find()
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

}