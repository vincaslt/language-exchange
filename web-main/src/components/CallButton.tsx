import * as React from 'react'
import styled from '../constants/themed-components'
import { IconButton } from '../ui/IconButton'

type Props = {
  inCall: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const CallButton = ({ inCall, ...props }: Props) => (
  <IconButton
    options={{ name: 'phone' }}
    {...props}
  />
)

const StyledCallButton = styled(CallButton)`
  color: ${({ inCall, theme }) => inCall ? theme.colors.primary : theme.colors.secondary }
  background: transparent
  border: transparent
`

export { StyledCallButton as CallButton }