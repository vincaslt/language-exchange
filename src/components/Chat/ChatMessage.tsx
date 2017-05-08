import * as React from 'react'
import styled from '../../constants/themed-components'

interface Props {
  children?: JSX.Element,
  secondary?: boolean
}

const Container = styled.div`
  display: flex
  flex-direction: row
`

const ChatMessage = ({ secondary, children, ...rest }: Props) => (
  <Container>
    <div {...rest}>
      {children}
    </div>
  </Container>
)

const StyledChatMessage = styled<Props>(ChatMessage)`
  padding: 10px
  margin: 5px
  border: 0
  color: ${({ secondary, theme }) => secondary ? theme.colors.dark : theme.colors.text}
  background-color: ${({ secondary, theme }) => secondary ? theme.colors.light : theme.colors.secondaryLight}
  border-radius: 10px
  max-width: 75%
`

export default StyledChatMessage