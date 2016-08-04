import React from 'react'
import { connect } from 'react-redux'
import DevicePanel from './DevicePanel'
import DeviceTypePanel from './DeviceTypePanel'
import ControlsPanel from './ControlsPanel'
import { deleteDevice, deleteDeviceType, deleteControl } from '../state'
import { addDevice, addDeviceType, addControl } from '../state'

const AdminDashboard = () => (
  <div>
    <DevicePanel />
    <DeviceTypePanel />
    <ControlsPanel />
  </div>
)

export default AdminDashboard