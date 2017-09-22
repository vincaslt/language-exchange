import * as React from 'react'
import styled from '../../constants/themed-components'
import { HeaderWithContent } from '../../components/HeaderWithContent'
import { ActiveUsersList } from '../../components/ActiveUsersList'

const Container = styled.div`
  padding: 25px;
`

const ActiveUsers = ({ ...rest }) => (
  <HeaderWithContent {...rest}>
    <Container>
      <ActiveUsersList />
    </Container>
  </HeaderWithContent>
)

const StyledActiveUsers = styled(ActiveUsers) `
  background-color: ${({ theme }) => theme.colors.white};
`

export { StyledActiveUsers as ActiveUsers }
