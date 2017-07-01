import { createAction, handleActions, Action } from 'redux-actions'
import { createSelector } from 'reselect'
import { State as ReduxState } from './index'
import { peerId } from './peerjs'
import { withPayload } from '../utils/reduxUtils'

export type ChatWindow = {
  visible: boolean
}

export type ChatState = {
  [key: string]: ChatWindow
}

// <RecipientId, ChatWindow>
export const initialState: ChatState = {}

export const types = {
  TOGGLE_WINDOW: 'CHAT/TOGGLE_WINDOW'
}

export const actions = {
  toggleWindow: createAction(types.TOGGLE_WINDOW, (id: string) => id)
}

export const reducer = handleActions<ChatState, string>({
  [types.TOGGLE_WINDOW]: (state: ChatState, action: Action<string>): ChatState => {
    return withPayload(action, (payload) => {
      const window = state[payload] || {}
      return {
        ...state,
        [payload]: {
          ...window,
          visible: !window.visible
        }
      }
    }, state)
  }
}, initialState)

/** Filters out only visible chat windows */
export const visibleChatWindows = (state: ReduxState) => Object
  .entries(state.chat)
  .filter(([id, window]) => window.visible)
  .reduce<ChatState>((obj, [id, window]) => ({ ...obj, [id]: window }), {})

export const isActiveChatVisible = createSelector(
  visibleChatWindows,
  peerId,
  (visibleWindows, peerId) => peerId ? visibleWindows[peerId] : false
)
