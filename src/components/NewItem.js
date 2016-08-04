import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addDevice, addDeviceType, addControl } from '../state'

const uiControls = [ 'Slider', 'Select', 'Switch' ]
const songs = ['2 + 2 = 5', 'Everything In Its Right Place', 'The National Anthem',
               'The Tourist', 'Sunshine On My Back', 'Vanderlyle Crybaby Geeks',
               'Nux Vomica', 'Jesus For the Jugular', 'Lavinia', 'Valleys of New Orleans',
               'Kid A', 'Like Spinning Plates', 'Life In A Glass House']

const NewItem = ({
  params, devices, deviceTypes, controls,
  addDevice, addDeviceType, addControl
}) => (
  <div className='new-item-panel'>
    {params.type === 'device' &&
      <div>
      <h1>New Device</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const name = document.getElementsByTagName('input')[0].value
        const deviceType = document.getElementsByTagName('select')[0].value
        const deviceId = ((devices.reduce( (id, device) => 
          Math.max(id, device.deviceId), 0)) + 1).toString()
        const dT = deviceTypes.findIndex(dT => dT.name === deviceType)
        const randomizedPlaylist = songs.sort( function() { return 0.5 - Math.random() } );
        const controlVals = deviceTypes[dT].controls.reduce((obj, control) => {
          return Object.assign({}, obj, {
            [control]: control === 'Playlist' ? randomizedPlaylist.slice(0, 4) : 0
          })
        }, {})
        const newDevice = {
          deviceId,
          name,
          deviceType,
          controlVals
        }
        console.log(newDevice)
        addDevice(newDevice)
        }
      }>
      <label htmlFor='name'>New Device Name</label>
      <input type='text' name='name' placeholder='New Device Name'/>
      <label htmlFor='deviceType'>Device Type</label>
      <select name='deviceType'>
        {deviceTypes.map((type, index) => (
          <option key={`type-${index}`}>
            {type.name}
          </option>
        ))}
      </select>
      <input type='submit'/>
    </form>
    </div>}
    {params.type === 'deviceType' &&
      <div>
      <h1>New Device Type</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const name = document.getElementsByTagName('input')[0].value
        const selected = document.getElementsByTagName('select')[0].selectedOptions
        const controls = [...selected].map(c => c.value)
        const newDeviceType = { name, controls }
        console.log(newDeviceType)
        addDeviceType(newDeviceType)
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
    </form>
    </div>}
    {params.type === 'control' &&
      <div>
      <h1>New Control</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const displayName = document.getElementsByTagName('input')[0].value
        const uiControl = document.getElementsByTagName('select')[0].value
        const newControl = { displayName, uiControl }
        console.log(newControl)
        addControl(newControl)
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
    </form>
    </div>}
    <Link to='/'>Back</Link>
  </div>
)

const mapStateToProps = (state) => ({
  devices: state.devices,
  deviceTypes: state.deviceTypes,
  controls: state.controls
})

const mapDispatchToProps = (dispatch) => ({
  addDevice: (device) => dispatch(addDevice(device)),
  addDeviceType: (deviceType) => dispatch(addDeviceType(deviceType)),
  addControl: (control) => dispatch(addControl(control))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewItem)