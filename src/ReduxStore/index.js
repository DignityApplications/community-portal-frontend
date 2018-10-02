import appReducer from './Reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

//Middleware can be added here

export default (initialState={}) => {
	if (process.env.NODE_ENV === 'development') {
		return applyMiddleware(thunk)(createStore)(appReducer, initialState, composeWithDevTools())
	} else {
		return applyMiddleware(thunk)(createStore)(appReducer, initialState)
	}
}
