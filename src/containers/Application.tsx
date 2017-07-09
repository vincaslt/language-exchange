import * as React from 'react'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { HomePage } from '../pages/HomePage'
import { Notifications } from '../containers/Notifications'
import { ChatConnection } from '../containers/ChatConnection'
import { VideoCallPage } from '../pages/VideoCallPage'
import { routeNames } from '../constants/routeNames'
import { State as ReduxState } from '../modules'
import { SmallChat } from '../containers/SmallChat'
import { chatWindows, ChatWindows } from '../modules/chat'

type StateProps = {
  chatWindows: ChatWindows
}

type OwnProps = RouteComponentProps<{}>

type Props = StateProps & OwnProps

const Application = ({ chatWindows }: Props) => {
  const windows = Object.entries(chatWindows)
    .map(([id, window], index) => (
      <SmallChat key={id} windowId={id} order={index} />
    ))
  return (
    <div>
      <ChatConnection />
      <Notifications />
      <Route exact path={routeNames.home} component={HomePage} />
      <Route path={`${routeNames.call}/:recipientId?`} component={VideoCallPage} />
      {windows}
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  chatWindows: chatWindows(state)
})

const ConnectedApplication = withRouter<{}>(connect<StateProps, {}, OwnProps>(mapStateToProps)(Application))

export { ConnectedApplication as Application }