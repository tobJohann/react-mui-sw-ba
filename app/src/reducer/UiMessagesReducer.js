import {UI_MESSAGES_TYPES} from '../actions/actionTypes'

const initialState = {
  messages: [],
}

export default function uiMessagesActions(state = initialState, action) {
  switch (action.type) {
    case UI_MESSAGES_TYPES.SET_MESSAGE:
      return {...state, messages: [...state.messages, action.payload]}
    case UI_MESSAGES_TYPES.REMOVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...removeMessageByIndex(state.messages, action.payload),
        ],
      }
    default:
      return state
  }
}

const removeMessageByIndex = (state, index) => {
  state.splice(index, 1)
  return state
}