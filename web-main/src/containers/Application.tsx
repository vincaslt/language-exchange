import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Notifications } from '../containers/Notifications'
import { ChatConnection } from '../containers/ChatConnection'
import { State as ReduxState } from '../modules'
import { SmallChat } from '../containers/SmallChat'
import { chatWindows, ChatWindows } from '../modules/chat'
import { Routes } from './Routes'

type StateProps = {
  chatWindows: ChatWindows
}

type Props = StateProps

const Application = ({ chatWindows }: Props) => {
  const windows = Object.entries(chatWindows)
    .map(([id, window], index) => (
      <SmallChat key={id} windowId={id} order={index} />
    ))
  return (
    <div>
      <ChatConnection />
      <Notifications />
      <Routes />
      {windows}
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  chatWindows: chatWindows(state)
})

const ConnectedApplication = withRouter<{}>(
  connect<StateProps, {}, RouteComponentProps<{}>>(mapStateToProps)(Application)
)

export { ConnectedApplication as Application }