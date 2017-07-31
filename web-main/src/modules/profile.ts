import { createAction, handleActions, Action } from 'redux-actions'
import { State as ReduxState } from './index'
import { withPayload } from '../utils/reduxUtils'

export interface ProfileState {
  token?: string
}

export const initialState: ProfileState = {}

export const types = {
  LOGIN: 'PROFILE/LOGIN'
}

export const actions = {
  login: createAction(types.LOGIN, (token: string) => token)
}

export const reducer = handleActions<ProfileState, string>({
  [types.LOGIN]: (state: ProfileState, action: Action<string>): ProfileState => (
    withPayload(action, (payload) => ({
      ...state,
      token: payload
    }), state)
  )
}, initialState)

export const token = (state: ReduxState) => state.profile.token
