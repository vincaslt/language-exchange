import * as React from 'react'
import styled from '../../constants/themed-components'
import { CallButton } from '../../containers/CallButton'
import { ActiveCallMessageButton as MessageButton } from '../../containers/ActiveCallMessageButton'

const Sidebar = ({ ...rest }) => (
  <div {...rest}>
    <MessageButton />
    <CallButton />
  </div>
)

const StyledSidebar = styled(Sidebar)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.black};
  padding: 10px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export { StyledSidebar as Sidebar }