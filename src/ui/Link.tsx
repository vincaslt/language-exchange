import * as React from 'react'
import styled from '../constants/themed-components'
import * as H from 'history'
import { Link as RouterLink } from 'react-router-dom'

type Props = React.HTMLAttributes<{}> & {
  to?: H.LocationDescriptor
}

const Link = ({ to, ...rest }: Props) => (
  to
    ? <RouterLink to={to as H.LocationDescriptor} {...rest} />
    : <a {...rest} />
)

const StyledLink = styled(Link)`
  padding: 0 10px
  color: ${({ theme }) => theme.colors.light}
`

export default StyledLink