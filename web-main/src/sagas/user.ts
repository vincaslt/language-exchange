import { Action } from 'redux-actions'
import * as Notifications from 'react-notification-system-redux'
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
  try {
    const responseData: Dto.Token = yield call(Api.login, action.payload)
    yield put(tokenActions.loginSuccess(responseData.token))
  } catch (error) {
    yield put(Notifications.error({
      autoDismiss: 2,
      title: error.response.data.message || 'Invalid credentials',
      position: 'tr'
    }))
  }
}

function* loginSuccessSaga() {
  yield put(Notifications.success({
    autoDismiss: 2,
    title: 'Sucessfully logged in!',
    position: 'tr'
  }))
  yield put(actions.requestUserInfo())
}

function* registrationSaga(action: Action<Dto.Registration>) {
  try {
    yield call(Api.createUser, action.payload)
    yield put(Notifications.success({
      autoDismiss: 2,
      title: 'Sucessfully registered!',
      position: 'tr'
    }))
  } catch (error) {
    yield put(Notifications.error({
      autoDismiss: 2,
      title: error.response.data.message,
      position: 'tr'
    }))
  }
}

export default [
  takeLatest(types.REQUEST_USER_INFO, requestUserInfoSaga),
  takeLatest(tokenTypes.LOGIN_SUCCESS, loginSuccessSaga),
  takeLatest(tokenTypes.LOGIN, loginSaga),
  takeLatest(types.REQUEST_CREATE_USER, registrationSaga)
]
