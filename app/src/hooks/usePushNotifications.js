import {useState} from 'react'
import {PushNotifications} from '../lib/PushNotifications'
import useUiMessages from './useUiMessages'

export default function usePushNotifications() {
  const browserSupport = PushNotifications.isSupported()
  const uiMessages = useUiMessages()

  const [userConsent, setUserConsent] = useState(window.Notification.permission)
  const [subscription, setSubscription] = useState(PushNotifications.isSubscribed())
  const [isSubscribed, setIsSubscribed] = useState(subscription !== null)

  const handleUserConsent = async () => {
    setUserConsent(await PushNotifications.getUserConsent())
  }
  const handleSubscription = async () => {
    const {message: response, subscription} = await PushNotifications.subscribe()
    setSubscription(subscription)
    setIsSubscribed(true)
    uiMessages.createSuccessMessage(response.title, response.message)
  }

  const handleLocalTest = async () => {
    PushNotifications.testLocalNotification('Local Test', {body: 'this is a local test of push notifications'})
  }

  const handleSend = async (title, options) => {
    const response = await PushNotifications.sendNotification(title, options)
    console.log(response)
    return response
  }

  return ({
    browserSupport,
    userConsent,
    subscription,
    isSubscribed,

    handleUserConsent,
    handleSubscription,
    handleLocalTest,
    handleSend,
  })
}