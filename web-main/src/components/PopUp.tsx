import * as React from 'react'
import styled from '../constants/themed-components'
import { IconButton } from '../ui/IconButton'

type Props = {
  isOpen?: boolean,
  onClose?: Function,
  children: React.ReactNode
}

const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.transparentGray};
`

const PopUpContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 2px;
  top: 2px;
  padding: 0;
  color: ${({ theme }) => theme.colors.secondary};
  border: 0px;
  background: none;
`

const PopUp = ({ isOpen = false, onClose, children }: Props) => {
  const closeButton = onClose ? (
    <CloseButton
      options={{ name: 'times', size: 'lg' }}
      onClick={() => onClose()}
    />
  ) : null
  return isOpen ? (
    <Overlay>
      <PopUpContainer>
        {closeButton}
        {children}
      </PopUpContainer>
    </Overlay>
  ) : null
}

export { PopUp }