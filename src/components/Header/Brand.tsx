import * as React from 'react'
import styled from '../../constants/themed-components'

const Brand = ({ ...rest }) => (
  <div {...rest}>
    BrandName
  </div>
)

const StyledBrand = styled(Brand)`
  padding: 0 10px
`

export default StyledBrand