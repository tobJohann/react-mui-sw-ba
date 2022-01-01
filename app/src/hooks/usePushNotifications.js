import React, {useState} from 'react'
import {PushNotifications} from '../lib/PushNotifications'
import useUiMessages from './useUiMessages'

export default function usePushNotifications() {
  const browserSupport = PushNotifications.isSupported()
  const uiMessages = useUiMessages()

  const [userConsent, setUserConsent] = useState(window.Notification.permission)
  const [subscription, setSubscription] = useState(null)

  const handleUserConsent = async () => {
    setUserConsent(await PushNotifications.getUserConsent())
  }
  const handleSubscription = async () => {
    const {message: response, subscription} = await PushNotifications.subscribe()
    setSubscription(subscription)
    uiMessages.createSuccessMessage(response.title, response.message)
  }

  const handleLocalTest = async () => {
    PushNotifications.testLocalNotification('Local Test', {message: 'this is a local test of push notifications'})
  }

  return ({
    browserSupport,
    userConsent,
    subscription,

    handleUserConsent,
    handleSubscription,
    handleLocalTest,
  })
}