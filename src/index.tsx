import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage'
import VideoCallPage from './pages/VideoCallPage'
import { store, browserHistory } from './store'
import theme from './constants/theme'

import 'normalize.css'
import './style.css'

const Application = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/chat/:recipientId?" component={VideoCallPage} />
    </div>
  </ThemeProvider>
)

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={browserHistory}>
      <Application />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
