import appReducer from './Reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

//Middleware can be added here

export default (initialState={}) => {
	return applyMiddleware(thunk)(createStore)(appReducer, initialState, composeWithDevTools())
}
