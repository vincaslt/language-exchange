import * as React from 'react'
import styled from '../../constants/themed-components'

type Props = {
  children?: JSX.Element
}

const Sidebar = ({ children, ...rest }: Props) => (
  <div {...rest}>
    {children}
  </div>
)

const StyledSidebar = styled(Sidebar)`
  color: ${({ theme }) => theme.colors.white}
  background-color: ${({ theme }) => theme.colors.dark}
  padding: 10px
  width: 150px
`

export default StyledSidebar