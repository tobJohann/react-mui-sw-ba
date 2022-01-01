import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {'Content-type': 'application/json'},
})

export const apiPushNotification = {
  get: async () => await api.get('push-subscriptions'),
  subscribe: async subscription => {
    await api.post('push-subscriptions/subscribe', subscription)
  },
  send: async (title, options) => await api.post('push-subscriptions', {title, options}),
}