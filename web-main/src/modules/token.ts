import { createAction, handleActions, Action } from 'redux-actions'
import { State as ReduxState } from './index'
import { withPayload } from '../utils/reduxUtils'

export type TokenState = string | null

export const initialState: TokenState = null

export const types = {
  LOGIN: 'TOKEN/LOGIN'
}

export const actions = {
  login: createAction(types.LOGIN, (token: string) => token)
}

export const reducer = handleActions<TokenState, string>({
  [types.LOGIN]: (state: TokenState, action: Action<string>): TokenState => (
    withPayload(action, (payload) => (payload), state)
  )
}, initialState)

export const token = (state: ReduxState) => state.token
