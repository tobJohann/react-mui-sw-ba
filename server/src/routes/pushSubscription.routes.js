import express from 'express'
import {PushSubscriptionController} from '../controllers/pushSubscription.controller'

const Router = express.Router()

/*
*
* */
Router.get('/', PushSubscriptionController.apiGet)

Router.post('/subscribe', PushSubscriptionController.apiFindOrStore)

export default Router
