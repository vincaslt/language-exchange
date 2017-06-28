import * as React from 'react'
import styled from 'styled-components'
import FontAwesome = require('react-fontawesome') // FIXME: wait for PR merge

type Props = {
  options: {
    name: string // FIXME: use PropTypes from FA when available
  }
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