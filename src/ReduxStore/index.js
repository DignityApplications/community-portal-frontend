import appReducer from './Reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

//Middleware can be added here

var build = process.env.NODE_ENV || 'prod'

export default (initialState={}) => {
	console.log(process.env.NODE_ENV)
	if (build === 'development') {
		return applyMiddleware(thunk)(createStore)(appReducer, initialState, composeWithDevTools())
	} else {
		return applyMiddleware(thunk)(createStore)(appReducer, initialState)
	}
}
