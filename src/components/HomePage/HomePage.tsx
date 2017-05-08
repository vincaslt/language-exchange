import * as React from 'react'
import styled from '../../constants/themed-components'
import MainSection from './MainSection'
import InfoSection from './InfoSection'
import Header from '../Header'

const HomePage = ({ ...rest }) => (
  <div {...rest}>
    <Header />
    <MainSection />
    <InfoSection />
  </div>
)

const StyledHomepage = styled(HomePage)`
  background-color: ${({ theme }) => theme.colors.white}
`

export default StyledHomepage
