import * as React from 'react'
import styled from '../../constants/themed-components'
import Link from '../../ui/Link'

const Brand = ({ ...rest }) => (
  <Link to="/" {...rest}>BrandName</Link>
)

const StyledBrand = styled(Brand)`
  padding: 0 10px
`

export default StyledBrand