import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { deleteDeviceType } from '../state'

const DeviceTypePanel = ({ deviceTypes, deleteDeviceType }) => (
  <div className='section-container'>
    <h1>Device Types</h1>
    <div className='section'>
      {deviceTypes.map((type, index) => (
        <div className='device-type-card' key={`type-${type.name}-${index}`}>
          <h3>{type.name}</h3>
          {type.controls.map((control, i) => (
            <p key={`${control}-${type.name}-${i}`}>
              {control}
            </p>
          ))}
          <Link to={`/edit/deviceType/${type.name}`} className='editBtn'>📝</Link>
          <span className='deleteBtn'
                onClick={() => {
                  console.log(`deleting ${type.name}`)
                  deleteDeviceType(type)
                }}>
            🗑
          </span>
        </div>
      ))}
      <Link to='/new/deviceType' className='addBtn'>+</Link>
    </div>
    <hr />
  </div>
)

const mapStateToProps = (state) => ({
  deviceTypes: state.deviceTypes
})

const mapDispatchToProps = (dispatch) => ({
  deleteDeviceType: (deviceType) => dispatch(deleteDeviceType(deviceType))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTypePanel)