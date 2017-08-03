import { createAction, handleActions, Action } from 'redux-actions'
import { Entities } from 'language-exchange-commons'
import { State as ReduxState } from './index'
import { withPayload, safeSelect } from '../utils/reduxUtils'

export type UserState = Entities.UserModel | null

export const initialState: UserState | null = null

export const types = {
  RECEIVE_USER_INFO: 'USER/RECEIVE_USER_INFO',
  REQUEST_USER_INFO: 'USER/REQUEST_USER_INFO'
}

export const actions = {
  receiveUserInfo: createAction(types.RECEIVE_USER_INFO, (user: Entities.UserModel) => user),
  requestUserInfo: createAction(types.REQUEST_USER_INFO)
}

export const reducer = handleActions<UserState, string>({
  [types.RECEIVE_USER_INFO]: (state: UserState, action: Action<Entities.UserModel>): UserState => (
    withPayload(action, (payload) => (payload), state)
  )
}, initialState)

const safeUserSelect = safeSelect<ReduxState>('user')

export const userId = safeUserSelect<number>('id')
