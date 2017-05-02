import * as React from 'react'
import styled from '../../constants/themed-components'

const InfoSection = ({ ...rest }) => (
  <div {...rest}>
    Some info
  </div>
)

const StyledInfoSection = styled(InfoSection)`
  min-height: 150vh
`

export default StyledInfoSection
