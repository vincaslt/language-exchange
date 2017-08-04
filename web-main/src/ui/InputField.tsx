import * as React from 'react'
import styled from '../constants/themed-components'

const InputField = ({ ...rest }) => (
  <input {...rest} type="text" />
)

const StyledInputField = styled(InputField)`
  color: ${({ color, theme }) => color ? theme.colors[color] : theme.colors.text};
  border: 1px solid ${({ color, theme }) => color ? theme.colors[color] : theme.colors.text};
  border-radius: 5px;
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex: 1;
  height: 30px;
  padding: 5px;
`

export { StyledInputField as InputField }