import React from 'react'
import {Alert, AlertTitle, Slide, Container, Stack, Snackbar} from '@mui/material'
import {TransitionGroup} from 'react-transition-group'
import {useSelector, useDispatch} from 'react-redux'
import {removeUiMessage} from '../../actions/uiMessagesActions'
import './UiMessages.sass'

export default function UiMessages({anchor = {horizontal: 'center', vertical: 'bottom'}}) {
  const className = `uiMessages h-${anchor.horizontal} v-${anchor.vertical}`
  const dispatch = useDispatch()
  const {messages: uiMessages} = useSelector(state => state.uiMessages)

  const handleClose = index => {
    dispatch(removeUiMessage(index))
  }
  return (
      <Container className={className}>
        <Stack>
          {
            uiMessages.map((uiMessage, index) => (
                <TransitionGroup>

                  <Slide direction={'left'} mountOnEnter unmountOnExit in={true}>
                    {/*TODO autohideduration*/}
                    <Alert
                        variant={'filled'}
                        className={'uiMessage'}
                        severity={uiMessage.severity}
                        key={index}
                        onClose={() => handleClose(index)}
                    >
                      <AlertTitle title={uiMessage.title}/>
                      {uiMessage.message}
                    </Alert>
                  </Slide>
                </TransitionGroup>
            ))}
        </Stack>
      </Container>
  )
}