import C from '../Constants'
import { combineReducers } from 'redux'

export const session = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_USER_LOGGEDIN:
          state = {...state, loggedIn: action.payload.loggedIn }
          return state
      case C.UPDATE_MODAL_OPEN:
          state = {...state, modal: { ...state.modal, open: action.payload} }
          return state
      case C.UPDATE_MODAL_COMPONENT:
          state = {...state, modal: { ...state.modal, component: action.payload} }
          return state
      case C.UPDATE_CURRENT_USER_ID:
          state = {...state, currentUserID: action.payload }
          return state
      case C.UPDATE_CURRENT_USER_PERMISSIONS:
          state = {...state, currentUserPermissions: action.payload }
          return state
      case C.UPDATE_USER_PROFILE_ID:
          state = {...state, currentUserProfileID: action.payload.id }
          return state
      case C.UPDATE_USER_DELETE_ID:
          state = {...state, currentUserDeleteID: action.payload.id }
          return state
      default:
          return state
    }
}

export const users = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_ALL_USERS:
          return action.payload
      case C.ADD_USER:
          state = [ ...state.concat(action.payload.user) ]
          return state
      case C.EDIT_USER:
          return action.payload
      case C.DELETE_USER:
          state = state.filter(user => user.id !== action.payload.id) 
          return state
      default:
          return state
    }
}

export const module = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_ACTIVE_MODULE:
          return action.payload
      default:
          return state
    }
}

export const navigation = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_ACTIVE_MENU:
          return action.payload
      default:
          return state
    }
}

export const menu = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_ACTIVE_MENU:
          return action.payload
      default:
          return state
    }
}

export const view = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_ACTIVE_VIEW:
          state = {
            //let's first get the current state (in this case it is just the activeView object in view)
            ...state,
            //now we map through and see if the view matches what we passed as the module
                activeView: state.activeView.map(view => view.Module === action.payload.module ?
                    //if it matched above, lets keep the view the same but update the View property to be the new activeView
                    { ...view, View: action.payload.activeView } : 
                    //if it was not a match, just keep it the same
                    view
                ) 
            }
          return state
      default:
          return state
    }
}

export default combineReducers({
    session, users, module, navigation, menu, view
})
