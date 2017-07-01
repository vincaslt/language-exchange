import * as React from 'react'
import { connect } from 'react-redux'
import { MessageButton as MessageButtonComponent } from '../components/MessageButton'
import { State as ReduxState } from '../modules'
import { actions, isActiveChatVisible } from '../modules/chat'
import { peerId } from '../modules/peerjs'

type StateProps = {
  isActiveChatVisible: boolean,
  peerId: string
}

type DispatchProps = {
  toggleWindow: typeof actions.toggleWindow
}

type Props = StateProps & DispatchProps

class ActiveCallMessageButton extends React.Component<Props> {
  handleClick = () => {
    this.props.toggleWindow(this.props.peerId)
  }

  render() {
    const {
      isActiveChatVisible,
      peerId,
      toggleWindow,
      ...rest
    } = this.props
    return (
      <MessageButtonComponent
        toggled={isActiveChatVisible}
        onClick={this.handleClick}
        {...rest}
      />
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  peerId: peerId(state),
  isActiveChatVisible: isActiveChatVisible(state)
})

const mapDispatchToProps = {
  toggleWindow: actions.toggleWindow
}

const ConnectedMessageButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCallMessageButton)

export { ConnectedMessageButton as ActiveCallMessageButton }