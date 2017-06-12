import * as React from 'react'
import styled from '../../constants/themed-components'
import Chat from '../../components/Chat'

const InfoSection = ({ ...rest }) => (
  <div {...rest}>
    <Chat />
  </div>
)

const StyledInfoSection = styled(InfoSection)`
  min-height: 150vh
  padding: 50px
  display: flex
  justify-content: center
`

export default StyledInfoSection
