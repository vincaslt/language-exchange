import * as React from 'react'
import styled from '../../constants/themed-components'
import { MainSection } from './MainSection'
import { InfoSection } from './InfoSection'
import { HeaderWithContent } from '../../components/HeaderWithContent'

const HomePage = ({ ...rest }) => (
  <HeaderWithContent nopadding {...rest}>
    <MainSection />
    <InfoSection />
  </HeaderWithContent>
)

const StyledHomePage = styled(HomePage)`
  background-color: ${({ theme }) => theme.colors.white};
`

export { StyledHomePage as HomePage }
