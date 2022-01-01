import {applyMiddleware, combineReducers, createStore} from 'redux'
import uiMessages from './UiMessagesReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const combinedReducers = combineReducers({
  uiMessages,
})

export const reduxStore = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))