console.log('Hello there, im the Servcie Worker')

self.addEventListener('push', event => {
  const {title, options} = JSON.parse(event.data.text())
  const promiseChain = self.registration.showNotification(title, options)
  event.waitUntil(promiseChain)
})