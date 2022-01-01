import React from 'react'
import {useDispatch} from 'react-redux'
import * as uiMessageService from '../actions/uiMessagesActions'

export default function useUiMessages() {
  const dispatch = useDispatch()
  const handleUiMessageClose = index => dispatch(uiMessageService.removeUiMessage(index))
  const createUiMessage = (title, message) => dispatch(uiMessageService.createUiMessage(title, message))
  const createErrorMessage = (title, message) => dispatch(uiMessageService.createErrorMessage(title, message))
  const createSuccessMessage = (title, message) => dispatch(uiMessageService.createSuccessMessage(title, message))
  const createInfoMessage = (title, message) => dispatch(uiMessageService.createInfoMessage(title, message))

  return ({
    handleUiMessageClose,
    createUiMessage,
    createErrorMessage,
    createSuccessMessage,
    createInfoMessage,
  })
}