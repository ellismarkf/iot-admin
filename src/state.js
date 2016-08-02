import { combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

/* ACTIONS */

/* REDUCERS */

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducers = combineReducers({ reducer })


/* STORE */

export const configureStore = initialState =>
  createStore(reducers, initialState)