import * as React from 'react'
import { connect } from 'react-redux'
import * as Notifications from 'react-notification-system-redux'
import { State as ReduxState } from '../modules'

const mapStateToProps = (state: ReduxState) => ({
  notifications: state.notifications
})

const NotificationsContainer = ({ ...props }: Notifications.NotificationsProps) => {
  return <Notifications {...props} />
}

const ConnectedNotifications = connect(mapStateToProps)(NotificationsContainer)

export { ConnectedNotifications as Notifications }