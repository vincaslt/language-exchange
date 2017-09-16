import * as React from 'react'
import styled from '../constants/themed-components'
import { IconButton } from '../ui/IconButton'

type Props = {
  onAnswer: Function,
  onHangUp: Function
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const ActionButton = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <IconButton
    options={{ name: 'phone', size: '2x' }}
    {...props}
  />
)

const StyledButton = styled(ActionButton)`
  right: 2px;
  top: 2px;
  color: ${({ theme }) => theme.colors.white};
  border: 0px;
  padding: 10px;
  border-radius: 50px;
  height: 50px;
  width: 50px;
  outline: none;
`

const StyledAnswerButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-right: 20px;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: none;
  }
`

const StyledHangUpButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    transform: rotate(135deg) scale(1.05);
  }

  &, &:active {
    transform: rotate(135deg);
  }
`

const IncomingCall = ({ onAnswer, onHangUp }: Props) => {
  return (
    <Container>
      <StyledAnswerButton onClick={() => onAnswer()} />
      <StyledHangUpButton onClick={() => onHangUp()} />
    </Container>
  )
}

export { IncomingCall }