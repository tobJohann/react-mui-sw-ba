import {PushSubscriptionService} from '../services/pushSubscription.service'

export class PushSubscriptionController {
  static async apiGet(req, res, next) {
    try {
      const subscriptions = await PushSubscriptionService.get()
      res.status(200).json(subscriptions)
    }
    catch (error) {
      res.status(500).json({error})
    }
  }

  static async apiFindOrStore(req, res, next) {
    try {
      let subscription = await PushSubscriptionService.findByEndpoint(req.body.endpoint)
      if (subscription === null) {
        subscription = await PushSubscriptionService.store(req.body)
        res.status(201).json(subscription)
      }
      else {
        res.status(200).json(subscription)
      }
    }
    catch (error) {
      console.log(error)
      res.status(500).json({error})
    }
  }

  static async apiStore(req, res, next) {
    try {
      const newSubscription = await PushSubscriptionService.store(req.body)
      res.status(201).json({subscription: newSubscription})
    }
    catch (error) {
      res.status(500).json({error})
    }
  }
}