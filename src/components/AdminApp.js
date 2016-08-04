import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchDevices, fetchControls, fetchDeviceTypes } from '../state'

class App extends Component {
  componentDidMount() {
    this.props.fetchDevices()
    this.props.fetchControls()
    this.props.fetchDeviceTypes()
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDevices: () => dispatch(fetchDevices()),
  fetchControls: () => dispatch(fetchControls()),
  fetchDeviceTypes: () => dispatch(fetchDeviceTypes())
})

export default connect(undefined, mapDispatchToProps)(App)