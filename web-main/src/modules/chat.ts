import { createAction, handleActions, Action } from 'redux-actions'
import { createSelector } from 'reselect'
import { State as ReduxState } from './index'
import { activeRoomId } from './videoChat'
import { withPayload } from '../utils/reduxUtils'
import * as Dto from 'language-exchange-commons/dist/dto'

// TODO: status or something, depending on if queued or not
interface ChatWindow {
  visible: boolean,
  messages?: ChatWindowMessage[]
}

export interface ChatWindowMessage {
  senderName: string
  content: string
}

export type ChatMessage = Dto.ChatMessage

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
  CLEAR_QUEUE: 'CHAT/CLEAR_QUEUE',
  RECEIVED_MESSAGE: 'CHAT/RECEIVED_MESSAGE',
  CONNECTED: 'CHAT/CONNECTED'
}

export const actions = {
  toggleWindow: createAction(types.TOGGLE_WINDOW, (id: string) => id),
  queueMessage: createAction(types.QUEUE_MESSAGE, (message: ChatMessage) => message),
  sendMessages: createAction(types.SEND_MESSAGES, (socket: SocketIOClient.Socket) => socket),
  clearQueue: createAction(types.CLEAR_QUEUE),
  receivedMessage: createAction(types.RECEIVED_MESSAGE, (message: Dto.ReceivedChatMessage) => message),
  connected: createAction(types.CONNECTED)
}

export const reducer = handleActions<ChatState, string | ChatMessage | Dto.ReceivedChatMessage>({
  [types.CONNECTED]: (state: ChatState, action: Action<string>): ChatState => (
    withPayload(action, (payload) => ({
      ...state
    }), state)
  ),
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
  [types.CLEAR_QUEUE]: (state: ChatState): ChatState => ({
    ...state,
    queue: []
  }),
  [types.SEND_MESSAGES]: (state: ChatState): ChatState => {
    return state.queue.reduce((newState: ChatState, queuedMessage) => {
      const id = queuedMessage.recipient
      const window = newState.windows[id] || { visible: true }
      window.messages = [
        ...(window.messages || []),
        {
          senderName: 'Me', // TODO: actual name via params or smth
          content: queuedMessage.content
        }
      ]
      state.windows[id] = window
      return state
    }, {...state})
  },
  // TODO: have a unique ID for all rooms, not based on senderId
  [types.RECEIVED_MESSAGE]: (state: ChatState, action: Action<Dto.ReceivedChatMessage>): ChatState => (
    withPayload(action, (payload) => {
      const id = payload.chatId
      const window = state.windows[id] || {}
      const messages = window.messages || []
      return ({
      ...state,
      windows: {
        ...state.windows,
        [id]: {
          ...window,
          visible: true,
          messages: [...messages, {
            senderName: payload.sender.name,
            content: payload.content
          }]
        }
      }
    })}, state)
  )
}, initialState)

export const chatWindows = (state: ReduxState) => state.chat.windows
export const chatWindowMessages = (id: string) => createSelector(
  chatWindows,
  (windows) => windows[id].messages || []
)

/** Filters out only visible chat windows */
export const visibleChatWindows = createSelector(
  chatWindows,
  (windows) => (Object
    .entries(windows)
    .filter(([id, window]) => window.visible)
    .reduce<ChatWindows>((obj, [id, window]) => ({ ...obj, [id]: window }), {})
  )
)

export const isActiveChatVisible = createSelector(
  visibleChatWindows,
  activeRoomId,
  (visibleWindows, roomId) => !!(roomId && visibleWindows[roomId])
)

export const isChatWindowVisible = (id: string) => createSelector(
  visibleChatWindows,
  (visibleWindows) => !!visibleWindows[id]
)

export const messageQueue = (state: ReduxState) => state.chat.queue
