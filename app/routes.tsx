import * as React from 'react'
import {Route, IndexRoute} from 'react-router'
import {requireAuthentication} from './components/authenticated'
import {App, ControlPanel, Progress, Search, Enroll} from './views'

export default(
      <Route path="/" component={App}>
        <Route path="/home" component={requireAuthentication(ControlPanel)}/>
        <Route path="/progress" component={requireAuthentication(Progress)}/>
        <Route path="/search" component={requireAuthentication(Search)}/>
        <Route path="/enroll" component={requireAuthentication(Enroll)}/>
      </Route>
);
