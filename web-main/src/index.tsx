import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { store, browserHistory } from './store'
import * as Theme from './constants/theme'
import { Application } from './containers/Application'
import 'core-js/es7'

import 'font-awesome/css/font-awesome.css'
import 'normalize.css'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  * {
    box-sizing: border-box
  }
`

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={browserHistory}>
      <ThemeProvider theme={Theme}>
        <Application />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
