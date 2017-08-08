import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'
import { Notification } from 'react-notification-system'
import styled from '../../constants/themed-components'
import { Button } from '../../ui/Button'


const NotificationActions = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

interface Props {
  callURL: string
}

const CallLinkNotification = ({ callURL }: Props) => (
  <NotificationActions>
    <CopyToClipboard text={callURL}>
      <Button color="secondary">Copy Link</Button>
    </CopyToClipboard>
  </NotificationActions>
)

const createCallLinkNotification = (message: string, notificationElement: JSX.Element): Notification => ({
  title: 'Your id:',
  message,
  position: 'tr',
  autoDismiss: 0,
  dismissible: false,
  children: notificationElement
})

export { CallLinkNotification, createCallLinkNotification }