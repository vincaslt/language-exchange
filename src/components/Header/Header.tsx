import * as React from 'react'
import styled from '../../constants/themed-components'
import Brand from './Brand'
import Navigation from './Navigation'
import NavigationButton from './NavigationButton'
import HeaderContent from './HeaderContent'

const Header = ({ ...rest }) => (
  <div {...rest}>
    <HeaderContent>
      <Brand />
      <Navigation>
        <NavigationButton href="#">link1</NavigationButton>
        <NavigationButton href="#">link2</NavigationButton>
        <NavigationButton href="#">link3</NavigationButton>
      </Navigation>
    </HeaderContent>
  </div>
)

const StyledHeader = styled(Header)`
  position: fixed
  width: 100%
  background-color: ${({ theme }) => theme.colors.secondary}
  height: 50px
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
`

export default StyledHeader
