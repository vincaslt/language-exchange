import * as React from 'react'
import * as Router from 'react-router'
import styled from '../../constants/themed-components'
import MainSection from './MainSection'
import InfoSection from './InfoSection'
import Header from '../../components/Header'

const HomePage = ({ ...rest }: Router.RouteComponentProps<{}>) => (
  <div>
    <Header />
    <MainSection />
    <InfoSection />
  </div>
)

const StyledHomepage = styled(HomePage)`
  background-color: ${({ theme }) => theme.colors.white}
`

export default StyledHomepage
