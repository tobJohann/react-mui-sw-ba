import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {'Content-type': 'application/json'},
})

export const apiPushNotification = {
  get: async () => await api.get('http://localhost:4000/api/push-subscriptions'),
  subscribe: async subscription => {
    await api.post('push-subscriptions/subscribe', subscription)
  },
}