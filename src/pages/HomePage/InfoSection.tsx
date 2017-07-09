import * as React from 'react'
import styled from '../../constants/themed-components'

const InfoSection = ({ ...rest }) => (
  <div {...rest}>
    Nothing here yet
  </div>
)

const StyledInfoSection = styled(InfoSection)`
  min-height: 150vh
  padding: 50px
  display: flex
  justify-content: center
`

export { StyledInfoSection as InfoSection }
