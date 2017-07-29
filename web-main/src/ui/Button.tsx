import styled from '../constants/themed-components'

const Button = styled.button`
  color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 0 20px;
  height: 30px;
  border: 0px;
  background-color: ${({ color, theme }) => color ? theme.colors[color] : theme.colors.primary};
`

export { Button }