import * as React from 'react'
import styled from '../../constants/themed-components'

export interface Props {
  order: number
}

const SmallChatContainer = ({ order, ...props }: Props) => (
  <div {...props} />
)

const StyledSmallChatContainer = styled(SmallChatContainer)`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 325px;
  height: 400px;
  width: auto;
  bottom: 0;
  right: ${({ order }: Props) => 125 + order * 335 }px;
  border-radius: 5px 5px 0 0;
  border: 1px solid ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.dark};
`

export { StyledSmallChatContainer as SmallChatContainer }