import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import AWS from 'aws-sdk'

// hard coded secrets?! 😱😱😱
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIAIUR5C7GXAHQRSM6A',
  secretAccessKey: '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'
})

const ddb = new AWS.DynamoDB({region: 'us-west-2'})
const docClient = new AWS.DynamoDB.DocumentClient()
const songs = ['2 + 2 = 5', 'Everything In Its Right Place', 'The National Anthem',
               'The Tourist', 'Sunshine On My Back', 'Vanderlyle Crybaby Geeks',
               'Nux Vomica', 'Jesus For the Jugular', 'Lavinia', 'Valleys of New Orleans',
               'Kid A', 'Like Spinning Plates', 'Life In A Glass House']
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

const requestDeviceTypes = () => ({
  type: 'REQUEST_DEVICE_TYPES'
})

const receiveDeviceTypes = (deviceTypes) => ({
  type: 'RECEIVE_DEVICE_TYPES',
  deviceTypes
})

export const fetchDeviceTypes = () => {
  return dispatch => {
    dispatch(requestDeviceTypes())
    docClient.scan({ TableName: 'deviceTypes' }, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else dispatch(receiveDeviceTypes(data.Items))
    })
  }
}

const deleteType = (item, type) => ({
  type: `DELETE_${type}`,
  item
})

export const deleteDevice = (device) => {
  return dispatch => {
    dispatch(deleteType(device, 'DEVICE'))
    const params = {
      TableName: 'devices',
      Key: {
        deviceId: device.deviceId
      }
    }
    docClient.delete(params, (err, data) => {
      if (err) console.log('ERROR!')
      else console.log('deleted successfully')
    })
  }
}

export const deleteDeviceType = (deviceType) => {
  return dispatch => {
    dispatch(deleteType(deviceType, 'DEVICE_TYPE'))
    const params = {
      TableName: 'deviceTypes',
      Key: {
        name: deviceType.name
      }
    }
    docClient.delete(params, (err, data) => {
      if (err) console.log('ERROR!')
      else console.log('deleted successfully')
    })
  }
}

export const deleteControl = (control) => {
  return dispatch => {
    dispatch(deleteType(control, 'CONTROL'))
    const params = {
      TableName: 'uiControls',
      Key: {
        displayName: control.displayName
      }
    }
    docClient.delete(params, (err, data) => {
      if (err) console.log('ERROR!')
      else console.log('deleted successfully')
    })
  }
}

const addType = (item, type) => ({
  type: `ADD_${type}`,
  item
})
export const addDevice = (device) => {
  return dispatch => {
    dispatch(addType(device, 'DEVICE'))
    const params = {
      TableName: 'devices',
      Item: {
        name: device.name,
        deviceType: device.deviceType,
        deviceId: device.deviceId,
        controlVals: device.controlVals
      }
    }
    docClient.put(params, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else console.log('added successfully')
    })
  }
}
export const addDeviceType = (deviceType) => {
  return dispatch => {
    dispatch(addType(deviceType, 'DEVICE_TYPE'))
    const params = {
      TableName: 'deviceTypes',
      Item: {
        name: deviceType.name,
        controls: [...deviceType.controls]
      }
    }
    docClient.put(params, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else console.log('added successfully')
    })
  }
}
export const addControl = (control) => {
  return dispatch => {
    dispatch(addType(control, 'CONTROL'))
    const params = {
      TableName: 'uiControls',
      Item: {
        displayName: control.displayName,
        uiControl: control.uiControl
      }
    }
    docClient.put(params, (err, data) => {
      if (err) console.log('ERROR!')
      else console.log('added successfully')
    })
  }
}

const editType = (item, type) => ({
  type: `EDIT_${type}`,
  item
})
export const editDevice = (device) => {
  return dispatch => {
    dispatch(editType(device, 'DEVICE'))
    const params = {
      TableName: 'devices',
      Key: {
        deviceId: device.deviceId
      },
      UpdateExpression: `set controlVals = :v, #n = :n, deviceType = :d`,
      ExpressionAttributeNames: {
          "#n": 'name'
      },
      ExpressionAttributeValues: {
          ":v": device.controlVals,
          ":n": device.name,
          ":d": device.deviceType
      }
    }
    docClient.update(params, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else console.log('changes saved successfully!')
    })
  }
}

export const editDeviceType = (deviceType) => {
  return (dispatch, getState) => {
    dispatch(editType(deviceType, 'DEVICE_TYPE'))
    const params = {
      TableName: 'deviceTypes',
      Key: {
        name: deviceType.name
      },
      UpdateExpression: `set controls = :c`,
      ExpressionAttributeValues: {
          ":c": deviceType.controls
      }
    }
    docClient.update(params, (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2))
      else console.log('edited successfully')
    })
    const typeInstances = getState().devices.filter(d => d.deviceType === deviceType.name);
    const randomizedPlaylist = songs.sort( function() { return 0.5 - Math.random() } );
    typeInstances.forEach( t => {
      const prms = {
        TableName: 'devices',
        Key: {
          deviceId: t.deviceId
        },
        UpdateExpression: `set controlVals = :v, deviceType = :d`,
        ExpressionAttributeValues: {
            ":v": deviceType.controls.reduce((obj, c) => {
              return Object.assign({}, obj, {
                [c]: c === 'Playlist' ? randomizedPlaylist.slice(0, 4) : 0
              })
            }, {}),
            ":d": deviceType.name
        }
      }
      console.log(prms)
      docClient.update(prms, (err, data) => {
        if (err) console.log(JSON.stringify(err, null, 2))
        else console.log('edited successfully')
      })
    })
  }
}

export const editControl = (control) => {
  return dispatch => {
    dispatch(editType(control, 'CONTROL'))
    const params = {
      TableName: 'uiControls',
      Item: {
        displayName: control.displayName,
        uiControl: control.uiControl
      }
    }
    docClient.put(params, (err, data) => {
      if (err) console.log('ERROR!')
      else console.log('edited successfully')
    })
  }
}


/* REDUCERS */
const device = (state, action) => {
  console.log(state.deviceId, action.item.deviceId, state.deviceId !== action.item.deviceId)
  if (state.deviceId !== action.item.deviceId) return state
  switch (action.type) {
    case 'EDIT_DEVICE':
      console.log(Object.assign({}, state, action.item))
      return Object.assign({}, state, action.item)
    default:
      return state
  }
}

const devices = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_DEVICES':
      return [...state, ...action.devices]
    case 'ADD_DEVICE':
      return [...state, action.item]
    case 'EDIT_DEVICE':
      return state.map(d => device(d, action))
    case 'DELETE_DEVICE':
      const deleteIndex = state.findIndex(
        device => device.name === action.item.name)
      return [...state.slice(0, deleteIndex), ...state.slice(deleteIndex + 1)]
    default:
      return state
  }
}

const control = (state, action) => {
  if (state.displayName !== action.item.displayName) return state
  switch (action.type) {
    case 'EDIT_CONTROL':
      return Object.assign({}, state, action.item)
    default:
      return state
  }
}

const controls = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CONTROLS':
      return [...state, ...action.controls]
    case 'ADD_CONTROL':
      return [...state, action.item]
    case 'EDIT_CONTROL':
      return state.map(c => control(c, action))
    case 'DELETE_CONTROL':
      const deleteIndex = state.findIndex(
        control => control.displayName === action.item.displayName)
      return [...state.slice(0, deleteIndex), ...state.slice(deleteIndex + 1)]
    default:
      return state
  }
}

const deviceType = (state, action) => {
  if (state.name !== action.item.name) return state
  switch (action.type) {
    case 'EDIT_DEVICE_TYPE':
      return Object.assign({}, state, action.item)
    default:
      return state
  }
}

const deviceTypes = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_DEVICE_TYPES':
      return [...state, ...action.deviceTypes]
    case 'ADD_DEVICE_TYPE':
      return [...state, action.item]
    case 'EDIT_DEVICE_TYPE':
      return state.map(dT => deviceType(dT, action))
    case 'DELETE_DEVICE_TYPE':
      const deleteIndex = state.findIndex(
        type => type.name === action.item.name)
      return [...state.slice(0, deleteIndex), ...state.slice(deleteIndex + 1)]
    default:
      return state
  }
}

const reducers = combineReducers({
  devices,
  controls,
  deviceTypes,
  routing: routerReducer
})


/* STORE */

export const configureStore = initialState =>
  createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  )