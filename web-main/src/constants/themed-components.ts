import * as styledComponents from 'styled-components'
import * as Theme from './theme'

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<typeof Theme>

export default styled
export { css, injectGlobal, keyframes, ThemeProvider }