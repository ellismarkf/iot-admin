import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './state'
import App from './components/App'
import DeviceList from './components/DeviceList'
import DeviceDetail from './components/DeviceDetail'
import './style/index.less'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={DeviceList} />
        <Route path='/:device' component={DeviceDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)