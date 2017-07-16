import * as React from 'react'
import styled from '../constants/themed-components'
import { IconButton } from '../ui/IconButton'

type Props = {
  toggled: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const MessageButton = ({ toggled, ...props }: Props) => (
  <IconButton
    options={{ name: 'comments-o' }}
    {...props}
  />
)

const StyledMessageButton = styled(MessageButton)`
  color: ${({ toggled, theme }) => toggled ? theme.colors.secondary : theme.colors.white }
  background: transparent
  border: transparent
`

export { StyledMessageButton as MessageButton }