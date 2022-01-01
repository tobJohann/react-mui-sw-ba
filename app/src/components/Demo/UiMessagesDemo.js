import React from 'react'
import {Button, Container, Grid, Typography} from '@mui/material'
import useUiMessages from '../../hooks/useUiMessages'

export default function UiMessage() {

  const uiMessages = useUiMessages()

  const handleError = () => uiMessages.createErrorMessage('Error-Test', 'Error test message')
  const handleSuccess = () => uiMessages.createSuccessMessage('Success-Test', 'Success test message')
  const handleInfo = () => uiMessages.createInfoMessage('Info-Test', 'Info test message')

  return (
      <Container>
        <Typography variant={'h6'} component={'h2'}>
          Ui Messages
        </Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Button variant={'contained'} onClick={handleError}>
              Create Error Message
            </Button>
          </Grid>
          <Grid item>
            <Button variant={'contained'} onClick={handleSuccess}>
              Create Success Message
            </Button>
          </Grid>
          <Grid item>
            <Button variant={'contained'} onClick={handleInfo}>
              Create Info Message
            </Button>
          </Grid>
        </Grid>
      </Container>
  )
}