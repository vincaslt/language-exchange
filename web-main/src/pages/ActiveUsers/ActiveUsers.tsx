import * as React from 'react'
import styled from '../../constants/themed-components'
import { HeaderWithContent } from '../../components/HeaderWithContent'

const ActiveUsers = ({ ...rest }) => (
  <HeaderWithContent {...rest}>
    Active users go here
  </HeaderWithContent>
)

const StyledActiveUsers = styled(ActiveUsers) `
  background-color: ${({ theme }) => theme.colors.white};
`

export { StyledActiveUsers as ActiveUsers }
