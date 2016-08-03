import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateValue } from '../state'

const DeviceDetail = ({ device, controls, updateValue }) => (
  <div>
    {console.log(controls)}
    {controls.map(control => {
      if (control.label === 'nowPlaying') return ''
      else return (
      <div key={`${device.name}-${control.label}`} className='ui-control'>
        <p>{control.label}</p>
        {control.component.uiControl === 'Slider' &&
          <input type='range' value={control.value}
                 onChange={(e) =>
                  updateValue(parseInt(e.target.value), device.name, control.label)} />}
        {control.component.uiControl === 'Select' &&
          <select onChange={(e) =>
                    updateValue(e.target.value, device.name, control.label)}
                  value={device.controlVals[control.label][device.controlVals.nowPlaying]}>
            {device.controlVals[control.label].map((item, index) => (
              <option key={`${device.name}-select-${index}`}>
                {item}
              </option>
            ))}
          </select>}
        {control.component.uiControl === 'Switch' &&
          <div className={control.value > 0 ? 'switch-active' : 'switch-inactive'}>
            <button onClick={(e) => 
              updateValue(Math.abs(e.target.innerHTML - 1), device.name, control.label)}>
              {control.value}
            </button>
          </div>
        }
      </div>
    )})}
  </div>
)

const mapStateToProps = (state, props) => {
  const current = state.devices.find(
    device => device.name === props.params.device
  )
  const currentControls = Object.keys(current.controlVals)
  return {
    device: current,
    controls: currentControls.map( (control, index) => ({
        label: control,
        value: current.controlVals[control],
        component: state.controls.find( c => {
          if (c === 'nowPlaying') return false
          else return c.displayName === control
        })
      })
    )
  }
}

const mapDispatchToState = (dispatch) => ({
  updateValue: (value, device, control) =>
    dispatch(updateValue(value, device, control))
})

export default connect(mapStateToProps, mapDispatchToState)(DeviceDetail)