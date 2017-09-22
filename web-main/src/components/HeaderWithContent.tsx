import * as React from 'react'
import styled from '../constants/themed-components'
import { Header, constants as headerConstants } from './Header'

interface Props {
  children?: React.ReactNode,
  fullscreen?: boolean,
  nopadding?: boolean
}

const Container = styled.div`
  display: flex;
  height: ${({ fullscreen }: Props) => fullscreen ? '100vh' : 'auto'};
  width: ${({ fullscreen }: Props) => fullscreen ? '100%' : 'auto'};
  min-height: 100vh;
  
`

const Content = styled.div`
  min-width: 100%;
  height: ${({ fullscreen }: Props) => fullscreen ? '100%' : 'auto'};
  width: ${({ fullscreen }: Props) => fullscreen ? '100%' : 'auto'};
`

const HeaderWithContent = ({ children, fullscreen, ...rest }: Props) => (
  <Container fullscreen={fullscreen}>
    <Header />
    <Content fullscreen={fullscreen} {...rest}>
      {children}
    </Content>
  </Container>
)

const StyledHeaderWithContent = styled(HeaderWithContent)`
  padding-top: ${({ nopadding }: Props) => !nopadding ? headerConstants.height : 'unset'};
`

export { StyledHeaderWithContent as HeaderWithContent}