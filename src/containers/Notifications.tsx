import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
const Notifications = require('react-notification-system-redux') // FIXME: when I know how

const mapStateToProps = (state: ReduxState) => ({
 notifications: state.notifications
})

export default connect(mapStateToProps)(Notifications)