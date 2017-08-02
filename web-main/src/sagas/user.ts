import { token, TokenState, types as tokenTypes } from '../modules/token'
import { types, actions } from '../modules/user'
import { getUserFromToken } from 'language-exchange-commons/api/user'
import { UserModel } from 'language-exchange-commons/entities'
import { takeLatest, select, put, call } from 'redux-saga/effects'

function* requestUserInfoSaga() {
  const jwtToken: TokenState = yield select(token)
  const user: UserModel = yield call(getUserFromToken, jwtToken)
  yield put(actions.receiveUserInfo(user))
}

function* loginSaga() {
  yield put(actions.requestUserInfo())
}

export default [
  takeLatest(types.REQUEST_USER_INFO, requestUserInfoSaga),
  takeLatest(tokenTypes.LOGIN, loginSaga)
]
