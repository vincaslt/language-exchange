import * as React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { HomePage } from '../pages/HomePage'
import { Notifications } from '../containers/Notifications'
import { VideoCallPage } from '../pages/VideoCallPage'
import { routeNames } from '../constants/routeNames'
import { State as ReduxState } from '../modules'
import { ChatContainer } from '../components/Chat'
import { ChatConnection } from '../containers/ChatConnection'
import { visibleChatWindows, ChatWindows } from '../modules/chat'

type StateProps = {
  visibleChatWindows: ChatWindows
}

type Props = StateProps

const Application = ({ visibleChatWindows }: Props) => {
  const chatWindows = Object.entries(visibleChatWindows)
    .map(([id, window], index) => (
      <ChatContainer key={id} order={index} />
    ))
  return (
    <div>
      <Notifications />
      <ChatConnection />
      <Route exact path={routeNames.home} component={HomePage} />
      <Route path={`${routeNames.call}/:recipientId?`} component={VideoCallPage} />
      {chatWindows}
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  visibleChatWindows: visibleChatWindows(state)
})

const ConnectedApplication = connect(mapStateToProps)(Application)

export { ConnectedApplication as Application }