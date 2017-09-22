import * as React from 'react'
import { connect } from 'react-redux'
import { CallButton as CallButtonComponent } from '../components/CallButton'
import { State as ReduxState } from '../modules'
import { outgoingCall, activeCall, actions } from '../modules/videoChat'

type StateProps = {
  isCallAnswered: boolean
  isCalling: boolean
}

type DispatchProps = {
  dropCall: typeof actions.dropCall
}

type Props = StateProps & DispatchProps

class CallButton extends React.Component<Props> {
  isInCall = () => this.props.isCallAnswered || this.props.isCalling

  handleClick = () => {
    if (this.isInCall()) {
      this.props.dropCall()
    }
  }

  render() {
    const {
      isCallAnswered,
      isCalling,
      dropCall,
      ...rest
    } = this.props
    return (
      <CallButtonComponent
        inCall={this.isInCall()}
        onClick={this.handleClick}
        {...rest}
      />
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  isCallAnswered: !!activeCall(state),
  isCalling: !!outgoingCall(state)
})

const mapDispatchToProps = {
  dropCall: actions.dropCall
}

const ConnectedCallButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallButton)

export { ConnectedCallButton as CallButton }