import * as React from 'react'
import { connect } from 'react-redux'
import { MessageButton as MessageButtonComponent } from '../components/MessageButton'
import { State as ReduxState } from '../modules'
import { actions, isActiveChatVisible } from '../modules/chat'
import { recipientId, isCallAnswered } from '../modules/peerjs'

type StateProps = {
  isActiveChatVisible: boolean,
  recipientId: string
  isCallAnswered: boolean
}

type DispatchProps = {
  toggleWindow: typeof actions.toggleWindow
}

type Props = StateProps & DispatchProps

class ActiveCallMessageButton extends React.Component<Props> {
  handleClick = () => {
    this.props.toggleWindow(this.props.recipientId)
  }

  render() {
    const {
      isActiveChatVisible,
      recipientId,
      isCallAnswered,
      toggleWindow,
      ...rest
    } = this.props
    return isCallAnswered && recipientId ? (
      <MessageButtonComponent
        toggled={isActiveChatVisible}
        onClick={this.handleClick}
        {...rest}
      />
    ) : null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  recipientId: recipientId(state),
  isActiveChatVisible: isActiveChatVisible(state),
  isCallAnswered: isCallAnswered(state)
})

const mapDispatchToProps = {
  toggleWindow: actions.toggleWindow
}

const ConnectedMessageButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCallMessageButton)

export { ConnectedMessageButton as ActiveCallMessageButton }