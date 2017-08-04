import { Action } from 'redux-actions'
import { token, TokenState, types as tokenTypes } from '../modules/token'
import { types, actions } from '../modules/user'
import { actions as tokenActions } from '../modules/token'
import * as Api from 'language-exchange-commons/dist/api'
import * as Models from 'language-exchange-commons/dist/models'
import * as Dto from 'language-exchange-commons/dist/dto'
import { takeLatest, select, put, call } from 'redux-saga/effects'

function* requestUserInfoSaga() {
  const jwtToken: TokenState = yield select(token)
  const user: Models.User = yield call(Api.getUserFromToken, jwtToken)
  yield put(actions.receiveUserInfo(user))
}

function* loginSaga(action: Action<Dto.Login>) {
  // TODO: handle errors
  const responseData: Dto.Token = yield call(Api.login, action.payload)
  yield put(tokenActions.loginSuccess(responseData.token))
}

function* loginSuccessSaga() {
  yield put(actions.requestUserInfo())
}

export default [
  takeLatest(types.REQUEST_USER_INFO, requestUserInfoSaga),
  takeLatest(tokenTypes.LOGIN_SUCCESS, loginSuccessSaga),
  takeLatest(tokenTypes.LOGIN, loginSaga)
]
