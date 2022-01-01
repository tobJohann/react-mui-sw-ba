import express from 'express'
import {PushSubscriptionController} from '../controllers/pushSubscription.controller'
import webPush from 'web-push'

const Router = express.Router()

/**
 * Push Subscriptions REST API end-point
 * @endpoint /api/push-subscriptions
 * @desc Returns all Push Subscriptions
 */
Router.get('/', PushSubscriptionController.apiGet)

/**
 * Push Subscriptions REST API end-point
 * @endpoint /api/push-notifications
 * @desc   Sends a Push Notification to all subscribers
 */
Router.post('/', PushSubscriptionController.apiSendToAll)

/**
 * Push Subscriptions REST API end-point
 * @endpoint /api/push-notifications/user/{id}
 * @desc Sends a Push Notification to a registered user
 */
Router.post('/user/{id}', () => {
})

Router.get('/test', async function(req, res, next) {
  console.log(webPush)
  try {
    webPush.setVapidDetails('mailto:test@gmail.com',
        'BJK6XmZlC247q4xA27TdR67lZXp70W0xF2g_LS2m0rCerkoCNF8NVkZyUCqNaOTf2R0HXyV_hfw3ZcrDyoV2mYs',
        'Op7UC_gTtEno8n8mAPar0pfjTCpQCle3EpbzFJOiqaA',
    )
    await webPush.sendNotification({
      'endpoint': 'https://fcm.googleapis.com/fcm/send/ePqYM0KsUAw:APA91bEUtlSuh4-2P0wwFkumbPknPl_hJAi1mcZmRV07E1957A4EggWXnm0wpNPzwbpM-YdbjsVN_3aw7pPHenMQyuZDAqVbab9baLQ4L5X-DVkouB9hsYjRJuGLwCghgOcpfL_nJG8f',
      'expirationTime': null,
      'keys': {
        'p256dh': 'BHrrObFL0vtDddTNlYuDoO1Zus_Q1POqAhsqBxyMN8AKos4zVglqIw_wN3v47GRqz7j-05wCHtZcwv4nhNe5ep4',
        'auth': 'caJ17fcTueDhCentzMw5qA',
      },
    }, {title: 'Hallo Welt'})
    res.status(200).json({message: 'Notification send, Test successful'})
  }
  catch (error) {
    console.error(error)
    res.status(500).json({error})
  }
})

/**
 * Push Subscription REST API end-point
 * @endpoint /api/push-notifications/subscribe
 * @desc Adds a subscriber to push notifications
 */
Router.post('/subscribe', PushSubscriptionController.apiFindOrStore)

export default Router
