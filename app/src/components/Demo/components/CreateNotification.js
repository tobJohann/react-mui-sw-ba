import React, {useState} from 'react'
import {Stack, TextField} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import usePushNotifications from '../../../hooks/usePushNotifications'

export default function CreateNotifcation() {

  const pushService = usePushNotifications()
  const [notification, setNotification] = useState({title: '', description: ''})
  const [loading, setLoading] = useState(false)

  const handleChange = prop => event => {
    setNotification({...notification, [prop]: event.target.value})
  }

  const handleSubmit = () => {
    if (notification.title.length === 0) {
      return
    }
    setLoading(true)

    pushService.handleSend(notification.title, {body: notification.description}).then(res => {
      console.log(res)
      setLoading(false)
      setNotification({title: '', description: ''})
    }).catch(error => {
      console.error(error)
    })
  }

  return <Stack spacing={2}>
    <TextField key={'title'} variant={'outlined'} name={'title'} label={'Title'} required
               onChange={handleChange('title')}
               value={notification.title}/>
    <TextField variant={'outlined'} name={'description'} label={'Description'} multiline rows={3} key={'description'}
               value={notification.description}
               onChange={handleChange('description')}/>
    <LoadingButton loading={loading} variant={'contained'} onClick={handleSubmit}>Send Notification to all
      Subscribers</LoadingButton>
  </Stack>
}