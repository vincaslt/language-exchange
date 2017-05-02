import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import HomePage from './components/HomePage'
import theme from './constants/theme'

import 'normalize.css'

const Application = () => (
  <ThemeProvider theme={theme}>
    <HomePage />
  </ThemeProvider>
)

ReactDOM.render(
  <Application />,
  document.getElementById('root') as HTMLElement
)
