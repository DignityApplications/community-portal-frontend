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
      case C.UPDATE_PROFILE_ID:
          state = {...state, currentProfileID: action.payload }
          return state
      case C.UPDATE_PROFILE_DATA:
          state = {...state, currentProfileData: action.payload }
          return state
      case C.UPDATE_PROFILE_DATA_ROLE:
          state = {...state, currentProfileData: { ...state.currentProfileData, role: action.payload } }
          return state
      case C.UPDATE_PROFILE_DATA_LOADED:
          state = {...state, currentProfileDataLoaded: action.payload }
          return state
      case C.UPDATE_CURRENT_ROLE_ID:
          state = {...state, currentRoleID: action.payload }
          return state
      case C.UPDATE_CURRENT_DELETE_ID:
          state = {...state, currentDeleteID: action.payload }
          return state
      case C.UPDATE_CURRENT_EVENT:
          state = {...state, currentEvent: action.payload }
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
          state = [ ...state.concat(action.payload) ]
          return state
      case C.UPDATE_USER:
          state = state.map(user => user.id === action.payload.id ? action.payload : user) 
          return state
      case C.DELETE_USER:
          state = state.filter(user => user.id !== action.payload.id) 
          return state
      default:
          return state
    }
}

export const events = (state=[], action ) => {
    switch(action.type) {
      case C.UPDATE_ALL_EVENTS:
          return action.payload
      case C.ADD_EVENT:
          state = [ ...state.concat(action.payload) ]
          return state
      case C.UPDATE_EVENT:
          state = state.map(event => event.id === action.payload.id ? action.payload : event) 
          return state
      case C.DELETE_EVENT:
          state = state.filter(event => event.id !== action.payload.id) 
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
    session, users, events, module, navigation, menu, view
})
