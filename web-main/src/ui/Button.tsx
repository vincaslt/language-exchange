import styled from '../constants/themed-components'

const Button = styled.button`
  color: ${({ theme, disabled }) => disabled ? theme.colors.grayText : theme.colors.text};
  border-radius: 5px;
  padding: 0 20px;
  height: 30px;
  border: 0px;
  background-color: ${({ color, theme, disabled }) => {
    if (disabled) {
      return theme.colors.gray
    }
    return color ? theme.colors[color] : theme.colors.primary}
  };
`

export { Button }