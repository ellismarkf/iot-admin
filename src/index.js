import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './state'
import AdminApp from './components/AdminApp'
import AdminDashBoard from './components/AdminDashBoard'
import EditItem from './components/EditItem'
import NewItem from './components/NewItem'
import './style/index.less'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={AdminApp}>
        <IndexRoute component={AdminDashBoard}/>
        <Route path='/edit/:type/:item' component={EditItem} />
        <Route path='/new/:type' component={NewItem} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)