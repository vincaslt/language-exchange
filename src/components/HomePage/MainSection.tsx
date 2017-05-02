import * as React from 'react'
import styled from '../../constants/themed-components'
const backgroundImage = require('./assets/background.jpg')

const MainSection = ({ ...rest }) => (
  <div {...rest}>
    To get started, edit <code>src/MainSection.tsx</code> and save to reload.
  </div>
)

const StyledMainSection = styled(MainSection)`
  background-color: ${({ theme }) => theme.colors.secondary}
  background-image: url(${backgroundImage})
  background-size: contain
  background-position: center bottom
  background-repeat: no-repeat
  min-height: 100vh
`

export default StyledMainSection
