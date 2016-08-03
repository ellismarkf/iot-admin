import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Nav from './Header'
import { fetchDevices, fetchControls } from '../state'

class App extends Component {
  componentDidMount() {
    this.props.fetchDevices()
    this.props.fetchControls()
  }
  render() {
    return (
      <div>
        <Nav location={this.props.location}/>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDevices: () => dispatch(fetchDevices()),
  fetchControls: () => dispatch(fetchControls())
})

export default connect(undefined, mapDispatchToProps)(App)