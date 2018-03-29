import C from '../Constants'
import { combineReducers } from 'redux'

export const user = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_USER_INFO:
          return action.payload
      case C.CLEAR_USER_INFO:
          return action.payload
      default:
          return state
    }
}

export default combineReducers({
    user
})
