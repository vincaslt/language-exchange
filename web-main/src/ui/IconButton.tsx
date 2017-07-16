import * as React from 'react'
import styled from 'styled-components'
import * as FontAwesome from 'react-fontawesome'

type Props = {
  options: FontAwesome.FontAwesomeProps
} & React.HTMLAttributes<HTMLButtonElement>

const IconButton = ({ options, ...rest }: Props) => (
  <button {...rest}>
    <FontAwesome size="2x" {...options} />
  </button>
)

const StyledIconButton = styled(IconButton)`
  padding: 10px
`

export { StyledIconButton as IconButton }