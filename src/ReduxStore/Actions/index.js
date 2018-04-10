import C from '../Constants'

//ACTIONS FOR SESSION DATA
export const updateUserLoggedIn = loggedIn => { return { type: C.UPDATE_USER_LOGGEDIN, payload: {loggedIn} }}
export const updateModalOpen = modalOpen => { return { type: C.UPDATE_MODAL_OPEN, payload: {modalOpen} }}
export const updateCurrentUserID = currentUserID => { return { type: C.UPDATE_CURRENT_USER_ID, payload: {currentUserID} } }
export const updateUserProfileID = id => { return { type: C.UPDATE_USER_PROFILE_ID, payload: {id} } }

//ACTIONS FOR USER DATA
export const updateAllUsers = users => { return { type: C.UPDATE_ALL_USERS, payload: {users} }}
export const getUserData = id => { return { type: C.GET_USER_DATA, payload: {id} }}
export const addUser = user => { return { type: C.ADD_USER, payload: {user} }}

//ACTIONS FOR MODULE DATA
export const updateActiveModule = activeModule => { return { type: C.UPDATE_ACTIVE_MODULE, payload: {activeModule} } }

//ACTIONS FOR MENU DATA
export const updateActiveMenu = menu => { return { type: C.UPDATE_ACTIVE_MENU, payload: {menu} } }

//ACTIONS FOR VIEW DATA
export const updateActiveView = (module, activeView) => { return { type: C.UPDATE_ACTIVE_VIEW, payload: {module, activeView} } }

//MULTI-ACTIONS
export const updateUserProfileID_and_ActiveView = (id, module, activeView) => (
  dispatch => {
    dispatch(updateUserProfileID(id))
    dispatch(updateActiveView(module, activeView))
  }
)