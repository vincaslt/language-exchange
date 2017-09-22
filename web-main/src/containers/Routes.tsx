import * as React from 'react'
import { VideoCallPage } from '../pages/VideoCallPage'
import { routeNames } from '../constants/routeNames'
import { HomePage } from '../pages/HomePage'
import { ActiveUsers } from '../pages/ActiveUsers'
import { Route } from 'react-router-dom'

const Routes = () => (
  <div>
    <Route exact path={routeNames.home} component={HomePage} />
    <Route exact path={routeNames.activeUsers} component={ActiveUsers} />
    <Route path={`${routeNames.call}/:roomId?`} component={VideoCallPage} />
  </div>
)

export { Routes }