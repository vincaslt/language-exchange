import * as React from 'react'
import * as Router from 'react-router'
import styled from '../../constants/themed-components'
import Header from '../../components/Header'

const VideoCallPage = ({ ...rest }: Router.RouteComponentProps<{}>) => (
  <div>
    <Header />
    <div>
      Video call page
    </div>
  </div>
)

const StyledVideoCallPage = styled(VideoCallPage)`
  background-color: ${({ theme }) => theme.colors.white}
`

export default StyledVideoCallPage
