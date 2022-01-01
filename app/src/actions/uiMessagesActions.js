import {UI_MESSAGES_TYPES} from './actionTypes'

export const createUiMessage = message => (dispatch, getState) => {
  dispatch({
    type: UI_MESSAGES_TYPES.SET_MESSAGE,
    payload: message,
  })
}

export const removeUiMessage = index => (dispatch, getState) => {
  dispatch({
    type: UI_MESSAGES_TYPES.REMOVE_MESSAGE,
    payload: index,
  })
}

export const createErrorMessage = (title, message) => createUiMessage({title, message, severity: 'error'})
export const createSuccessMessage = (title, message) => createUiMessage({title, message, severity: 'success'})
export const createInfoMessage = (title, message) => createUiMessage({title, message, severity: 'info'})

