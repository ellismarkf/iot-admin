import React from 'react'
import { connect } from 'react-redux'
import { deleteControl } from '../state'
import { Link } from 'react-router'

const ControlsPanel = ({ controls, deleteControl }) => (
  <div className='section-container'>
    <h1>UI Controls</h1>
    <div className='section'>
      {controls.map(control => (
        <div className='ui-control-card' key={`ui-control-${control.displayName}`}>
          <h3>{control.displayName}</h3>
          <p>{control.uiControl}</p>
          <Link to={`/edit/control/${control.displayName}`} className='editBtn'>📝</Link>
          <span className='deleteBtn'
                onClick={() => {
                  console.log(`deleting ${control.displayName}`)
                  deleteControl(control)
                }}>
            🗑
          </span>
        </div>
      ))}
      <Link to='/new/control' className='addBtn'>+</Link>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  controls: state.controls
})

const mapDispatchToProps = (dispatch) => ({
  deleteControl: (control) => dispatch(deleteControl(control))
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlsPanel)