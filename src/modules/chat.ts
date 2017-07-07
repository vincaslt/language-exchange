import { createAction, handleActions, Action } from 'redux-actions'
import { createSelector } from 'reselect'
import { State as ReduxState } from './index'
import { peerId } from './peerjs'
import { withPayload } from '../utils/reduxUtils'

interface ChatWindow {
  visible: boolean
}

export interface ChatMessage {
  recipient: string
  content: string
}

export interface ChatWindows {
  [key: string]: ChatWindow
}

export interface ChatState {
  queue: ChatMessage[]
  windows: ChatWindows
}

// <RecipientId, ChatWindow>
export const initialState: ChatState = {
  queue: [],
  windows: {}
}

export const types = {
  TOGGLE_WINDOW: 'CHAT/TOGGLE_WINDOW',
  QUEUE_MESSAGE: 'CHAT/QUEUE_MESSAGE',
  SEND_MESSAGES: 'CHAT/SEND_MESSAGES',
  CLEAR_QUEUE: 'CHAT/CLEAR_QUEUE'
}

export const actions = {
  toggleWindow: createAction(types.TOGGLE_WINDOW, (id: string) => id),
  queueMessage: createAction(types.QUEUE_MESSAGE, (message: ChatMessage) => message),
  sendMessages: createAction(types.SEND_MESSAGES, (socket: SocketIOClient.Socket) => socket),
  clearQueue: createAction(types.CLEAR_QUEUE)
}

export const reducer = handleActions<ChatState, string>({
  [types.TOGGLE_WINDOW]: (state: ChatState, action: Action<string>): ChatState => {
    return withPayload(action, (payload) => {
      const window = state.windows[payload] || {}
      return {
        ...state,
        windows: {
          ...state.windows,
          [payload]: {
            ...window,
            visible: !window.visible
          }
        }
      }
    }, state)
  },
  [types.QUEUE_MESSAGE]: (state: ChatState, action: Action<ChatMessage>): ChatState => {
    return withPayload(action, (payload) => ({
      ...state,
      queue: [...state.queue, payload]
    }), state)
  },
  [types.CLEAR_QUEUE]: (state: ChatState, action: Action<{}>): ChatState => ({
    ...state,
    queue: []
  })
}, initialState)

/** Filters out only visible chat windows */
export const visibleChatWindows = (state: ReduxState) => Object
  .entries(state.chat.windows)
  .filter(([id, window]) => window.visible)
  .reduce<ChatWindows>((obj, [id, window]) => ({ ...obj, [id]: window }), {})

export const isActiveChatVisible = createSelector(
  visibleChatWindows,
  peerId,
  (visibleWindows, peerId) => peerId ? visibleWindows[peerId] : false
)

export const messageQueue = (state: ReduxState) => state.chat.queue
