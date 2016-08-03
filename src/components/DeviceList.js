import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const DeviceList = ({ devices }) => (
  <div>
    {devices.map( (device, index) => (
      <Link to={`/${device.name}`} key={`device-${index}`} className='device-list-item'>
        <span>{device.name}</span>
        <span>></span>
      </Link>
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  devices: state.devices
})

export default connect(mapStateToProps)(DeviceList)