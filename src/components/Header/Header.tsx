import * as React from 'react'
import styled from '../../constants/themed-components'
import Brand from './Brand'
import Navigation from './Navigation'
import Link from '../../ui/Link'
import HeaderContent from './HeaderContent'
import constants from './constants'

const Header = ({ ...rest }) => (
  <div {...rest}>
    <HeaderContent>
      <Brand />
      <Navigation>
        <Link href="#" target="_blank">link1</Link>
        <Link href="#">link2</Link>
        <Link to={`/chat`}>Chat</Link>
      </Navigation>
    </HeaderContent>
  </div>
)

const StyledHeader = styled(Header)`
  position: fixed
  width: 100%
  background-color: ${({ theme }) => theme.colors.secondary}
  height: ${constants.height}
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
`

export default StyledHeader
