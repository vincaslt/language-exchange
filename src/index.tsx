import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage'
import VideoCallPage from './pages/VideoCallPage'
import { store } from './store'
import theme from './constants/theme'

import 'normalize.css'
import './style.css'

const Application = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/chat" component={VideoCallPage} />
      </div>
    </ThemeProvider>
  </Router>
)

ReactDOM.render(
  <Provider store={store} >
    <Application />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
