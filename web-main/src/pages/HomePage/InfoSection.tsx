import * as React from 'react'
import styled from '../../constants/themed-components'
import { Login } from '../../containers/Login'

const InfoSection = ({ ...rest }) => (
  <div {...rest}>
    <Login />
  </div>
)

const StyledInfoSection = styled(InfoSection)`
  min-height: 150vh;
  padding: 50px;
  display: flex;
  justify-content: center;
`

export { StyledInfoSection as InfoSection }
