import { createAction, handleActions, Action } from 'redux-actions'
import * as Dto from 'language-exchange-commons/dist/dto'
import { State as ReduxState } from './index'
import { withPayload } from '../utils/reduxUtils'

export type TokenState = string | null

export const initialState: TokenState = null

export const types = {
  LOGIN_SUCCESS: 'TOKEN/LOGIN_SUCCESS',
  LOGIN: 'TOKEN/LOGIN'
}

export const actions = {
  loginSuccess: createAction(types.LOGIN_SUCCESS, (token: string) => token),
  login: createAction(types.LOGIN, (loginData: Dto.Login) => loginData)
}

export const reducer = handleActions<TokenState, string>({
  [types.LOGIN_SUCCESS]: (state: TokenState, action: Action<string>): TokenState => (
    withPayload(action, (payload) => (payload), state)
  )
}, initialState)

export const token = (state: ReduxState) => state.token
