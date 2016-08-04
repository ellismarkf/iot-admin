import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { editDevice, editDeviceType, editControl } from '../state'

const uiControls = [ 'Slider', 'Select', 'Switch' ]

const EditItem = ({
  params, devices, deviceTypes, controls,
  editDevice, editDeviceType, editControl
}) => (
  <div className='edit-item-panel'>
    <h1>Edit {params.item}</h1>
      {params.type === 'device' &&
        <form onSubmit={(e) => {
          e.preventDefault()
          const currentDevice = devices.find(d => d.name === params.item)
          const deviceId = currentDevice.deviceId
          const newName = document.getElementsByTagName('input')[0].value
          const newDeviceType = document.getElementsByTagName('select')[0].value
          const name = newName !== '' ? newName : currentDevice.name
          const deviceType = newDeviceType !== '' ? newDeviceType : currentDevice.deviceType
          const dT = deviceTypes.findIndex(dT => dT.name === deviceType)
          const newControlVals = deviceTypes[dT].controls.reduce((obj, control) => {
            return Object.assign({}, obj, {
              [control]: control === 'Playlist' ? ['empty'] : 0
            })
          }, {})
          const controlVals = newDeviceType !== '' ? newControlVals : currentDevice.controlVals
          const newDevice = {
            deviceId,
            name,
            deviceType,
            controlVals
          }
          console.log(newDevice)
          editDevice(newDevice)
          }
        }>
        <label htmlFor='name'>Edit Device Name</label>
        <input type='text' name='name' placeholder='Edit Device Name'/>
        <label htmlFor='deviceType'>Edit Device Type</label>
        <select name='deviceType'>
          {deviceTypes.map((type, index) => (
            <option key={`type-${index}`}>
              {type.name}
            </option>
          ))}
        </select>
        <input type='submit'/>
      </form>}
      {params.type === 'deviceType' &&
        <form onSubmit={(e) => {
          e.preventDefault()
          const currentDeviceType = deviceTypes.find(dT => dT.name === params.item)
          const newName = document.getElementsByTagName('input')[0].value
          const selected = document.getElementsByTagName('select')[0].selectedOptions
          const name = newName !== '' ? newName : currentDeviceType.name
          const controls = selected.length > 0 ? [...selected].map(c => c.value) : currentDeviceType.controls
          const newDeviceType = { name, controls }
          console.log(newDeviceType)
          editDeviceType(newDeviceType)
          }
        }>
        <label htmlFor='name'>New Device Type Name</label>
        <input type='text' name='name' placeholder='New Device Type Name'/>
        <label htmlFor='control'>Select control(s) *ctrl or cmd click to select multiple</label>
        <select name='control' multiple>
          {controls.map((control, index)=> (
            <option key={`control-${index}`}>
              {control.displayName}
            </option>
          ))}
        </select>
        <input type='submit' />
      </form>}
      {params.type === 'control' &&
        <form onSubmit={(e) => {
          e.preventDefault()
          const currentControl = controls.find(c => c.displayName === params.item)
          const newDisplayName = document.getElementsByTagName('input')[0].value
          const newUiControl = document.getElementsByTagName('select')[0].value
          const displayName = newDisplayName !== '' ? newDisplayName : currentControl.displayName
          const uiControl = newUiControl !== '' ? newUiControl : currentControl.uiControl
          const newControl = { displayName, uiControl }
          console.log(newControl)
          editControl(newControl)
          }
        }>
        <label htmlFor='displayName'>New Control Name</label>
        <input type='text' name='displayName' placeholder='New UI Control Name'/>
        <label htmlFor='uiControls'>Select a UI Control</label>
        <select name='uiControls'>
          {uiControls.map((ui, index)=> (
            <option key={`ui-${index}`} value={ui}>
              {ui}
            </option>
          ))}
        </select>
        <input type='submit' />
      </form>}
    <Link to='/'>Back</Link>
  </div>
)

const mapStateToProps = (state) => ({
  devices: state.devices,
  deviceTypes: state.deviceTypes,
  controls: state.controls
})

const mapDispatchToProps = (dispatch) => ({
  editDevice: (device) => dispatch(editDevice(device)),
  editDeviceType: (deviceType) => dispatch(editDeviceType(deviceType)),
  editControl: (control) => dispatch(editControl(control))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)