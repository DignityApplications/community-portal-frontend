import appReducer from './Reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

//Middleware can be added here

export default (initialState={}) => {
	return applyMiddleware(thunk)(createStore)(appReducer, initialState)
}
