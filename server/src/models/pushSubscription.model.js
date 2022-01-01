import mongoose, {Schema} from 'mongoose'

const pushSubscriptionSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
    unique: true,
  },
  expirationTime: Number,
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },
})

const pushSubscription = mongoose.model('pushSubscription',
    pushSubscriptionSchema)

export default pushSubscription

