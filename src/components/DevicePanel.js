import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { deleteDevice } from '../state'

const DevicePanel = ({ devices, deleteDevice, deviceTypes }) => (
  <div className='section-container'>
    <h1>Devices</h1>
    <div className='section'>
      {devices.map((device, i) => {
        const type = deviceTypes.find( type => type.name === device.deviceType)
        const selected = device.controlVals.nowPlaying ? device.controlVals.Playlist[device.controlVals.nowPlaying] : 'Nothing Selected'
        return (
          <div className='device-card' key={`device-${device.name}-${i}`}>
            <h3>{device.name}</h3>
            <h4>{device.deviceType}</h4>
            {type.controls.map( (control, ic) => (
                <p key={`device-${device.deviceId}-control-${ic}`}>
                  {control === 'Playlist' ? 'Selected' : control} | {device.controlVals[control].length ? selected : device.controlVals[control]}
                </p>
            ))}
            <Link to={`/edit/device/${device.name}`} className='editBtn'>📝</Link>
            <span className='deleteBtn'
                  onClick={() => {
                    console.log(`deleting ${device.name}-${device.deviceId}`)
                    deleteDevice(device)
                  }}>
              🗑
            </span>
          </div>
        )}
      )}
      <Link to='/new/device' className='addBtn'>+</Link>
    </div>
    <hr />
  </div>
)

const mapStateToProps = (state) => ({
  devices: state.devices,
  deviceTypes: state.deviceTypes
})

const mapDispatchToProps = (dispatch) => ({
  deleteDevice: (device) => dispatch(deleteDevice(device))
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicePanel)