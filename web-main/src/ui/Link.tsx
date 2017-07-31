import * as React from 'react'
import styled from '../constants/themed-components'
import * as History from 'history'
import { Link as RouterLink } from 'react-router-dom'

type Props = React.AllHTMLAttributes<HTMLAnchorElement> & {
  to?: History.LocationDescriptor
}

class Link extends React.Component<Props> {
  render() {
    const { to, ...rest } = this.props
    return (
      to
        ? <RouterLink to={to as History.LocationDescriptor} {...rest} />
        : <a {...rest} />
    )
  }
}

const StyledLink = styled(Link)`
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.light};
`

export { StyledLink as Link }