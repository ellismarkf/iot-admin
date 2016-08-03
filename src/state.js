import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import AWS from 'aws-sdk'

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIAIUR5C7GXAHQRSM6A',
  secretAccessKey: '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'
})

const ddb = new AWS.DynamoDB({region: 'us-west-2'})
const docClient = new AWS.DynamoDB.DocumentClient()

/* ACTIONS */

const requestDevices = () => ({
  type: 'REQUEST_DEVICES'
})

const receiveDevices = (devices) => ({
  type: 'RECEIVE_DEVICES',
  devices
})

export const fetchDevices = () => {
  return dispatch => {
    dispatch(requestDevices())
    docClient.scan({ TableName: 'devices' }, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else dispatch(receiveDevices(data.Items))
    })
  }
}

const requestControls = () => ({
  type: 'REQUEST_CONTROLS'
})

const receiveControls = (controls) => ({
  type: 'RECEIVE_CONTROLS',
  controls
})

export const fetchControls = () => {
  return dispatch => {
    dispatch(requestControls())
    docClient.scan({ TableName: 'uiControls' }, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else dispatch(receiveControls(data.Items))
    })
  }
}

const updateControl = (value, device, control) => ({
  type: 'UPDATE_CONTROL',
  device,
  control,
  value
})

export const updateValue = (value, device, control) => {
  return (dispatch, getState) => {
    const prevValue = getState().devices.find( d =>
      d.name === device).controlVals[control]
    console.log(`${device} ${control} value changed from ${prevValue} to`, value)
    dispatch(updateControl(value, device, control))
  }
}

/* REDUCERS */
const device = (state, action) => {
  if (state.name !== action.device) return state
  switch (action.type) {
    case 'UPDATE_CONTROL':
      if (state.controlVals[action.control].length) {
        return Object.assign({}, state, {
          controlVals: Object.assign({}, state.controlVals, {
            nowPlaying: state.controlVals[action.control].indexOf(action.value) 
          })
        })
      }
      else return Object.assign({}, state, {
        controlVals: Object.assign({}, state.controlVals, {
          [action.control]: action.value 
        })
      })
    default:
      return state
  }
}

const devices = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_DEVICES':
      return [...state, ...action.devices]
    case 'UPDATE_CONTROL':
      return state.map( d => device(d, action))
    default:
      return state
  }
}


const controls = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CONTROLS':
      return [...state, ...action.controls]
    default:
      return state
  }
}

const reducers = combineReducers({
  devices,
  controls,
  routing: routerReducer
})


/* STORE */

export const configureStore = initialState =>
  createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )