import * as React from 'react'
import { connect } from 'react-redux'
import { MessageButton as MessageButtonComponent } from '../components/MessageButton'
import { State as ReduxState } from '../modules'
import { actions, isActiveChatVisible } from '../modules/chat'
import { activeCall, activeRoomId } from '../modules/videoChat'

type StateProps = {
  isActiveChatVisible: boolean,
  windowId: string
  isCallAnswered: boolean
}

type DispatchProps = {
  toggleWindow: typeof actions.toggleWindow
}

type Props = StateProps & DispatchProps

class ActiveCallMessageButton extends React.Component<Props> {
  handleClick = () => {
    this.props.toggleWindow(this.props.windowId)
  }

  render() {
    const {
      isActiveChatVisible,
      windowId,
      isCallAnswered,
      toggleWindow,
      ...rest
    } = this.props
    return isCallAnswered && windowId ? (
      <MessageButtonComponent
        toggled={isActiveChatVisible}
        onClick={this.handleClick}
        {...rest}
      />
    ) : null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  windowId: activeRoomId(state),
  isActiveChatVisible: isActiveChatVisible(state),
  isCallAnswered: !!activeCall(state)
})

const mapDispatchToProps = {
  toggleWindow: actions.toggleWindow
}

const ConnectedMessageButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCallMessageButton)

export { ConnectedMessageButton as ActiveCallMessageButton }