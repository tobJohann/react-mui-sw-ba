import React, {useState} from 'react'
import usePushNotifications from '../../hooks/usePushNotifications'
import {Button, Container, Grid, Typography} from '@mui/material'
import CreateNotification from './components/CreateNotification'

export default function PushNotificationsDemo() {
  const pushService = usePushNotifications()

  return (
      <Container sx={{my: 3}}>
        <Typography variant={'h6'} component={'h2'}>Push Service</Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Button disabled={pushService.userConsent === 'granted'} variant={'contained'}>Ask for Permission</Button>
          </Grid>
          <Grid item>
            <Button disabled={pushService.isSubscribed} variant={'contained'}
                    onClick={pushService.handleSubscription}>
              Subscribe Service
            </Button>
          </Grid>
          <Grid item>
            <Button variant={'contained'} onClick={pushService.handleLocalTest}>
              Test local notification
            </Button>
          </Grid>
          <Grid item>
            <CreateNotification/>
          </Grid>
        </Grid>
      </Container>
  )

}