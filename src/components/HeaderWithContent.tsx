import * as React from 'react'
import styled from 'styled-components'
import Header, { constants as headerConstants} from './Header'

interface Props {
  children?: JSX.Element,
  fullscreen?: boolean,
  nopadding?: boolean
}

const Container = styled.div`
  height: ${({ fullscreen }: Props) => fullscreen ? '100vh' : 'auto'}
  width: ${({ fullscreen }: Props) => fullscreen ? '100%' : 'auto'}
`

const Content = styled.div`
  height: ${({ fullscreen }: Props) => fullscreen ? '100%' : 'auto'}
  width: ${({ fullscreen }: Props) => fullscreen ? '100%' : 'auto'}
  position: relative
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
  padding-top: ${({ nopadding }: Props) => !nopadding ? headerConstants.height : 'auto'}
`

export default StyledHeaderWithContent