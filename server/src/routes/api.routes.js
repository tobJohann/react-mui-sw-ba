import express from 'express'
import pushSubscriptionRoutes from './pushSubscription.routes'

const Router = express.Router()

Router.use('/push-subscriptions', pushSubscriptionRoutes)

export default Router