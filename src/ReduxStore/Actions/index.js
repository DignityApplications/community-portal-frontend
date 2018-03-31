import C from '../Constants'

//ACTIONS FOR SESSION DATA
export function updateUserLoggedIn(loggedIn) {
  return {
    type: C.UPDATE_USER_LOGGEDIN,
    payload: {loggedIn}
  }
}
export function updateModalOpen(modalOpen) {
  return {
    type: C.UPDATE_MODAL_OPEN,
    payload: {modalOpen}
  }
}
export function updateCurrentUserID(currentUserID) {
  return {
    type: C.UPDATE_CURRENT_USER_ID,
    payload: {currentUserID}
  }
}
//ACTIONS FOR USER DATA
export function updateUserInfo(username, isLoggedIn, token) {
  return {
    type: C.UPDATE_USER_INFO,
    payload: {username, isLoggedIn, token}
  }
}
export function clearUserInfo() {
  return {
    type: C.UPDATE_USER_INFO,
    payload: {username: "", isLoggedIn: false, token: ""}
  }
}
//ACTIONS FOR MODULE DATA
export function updateActiveModule(activeModule) {
  return {
    type: C.UPDATE_ACTIVE_MODULE,
    payload: {activeModule}
  }
}
//ACTIONS FOR MENU DATA
export function updateActiveMenu(menu) {
  return {
    type: C.UPDATE_ACTIVE_MENU,
    payload: {menu}
  }
}
//ACTIONS FOR VIEW DATA
export function updateActiveView(module, activeView) {
  return {
    type: C.UPDATE_ACTIVE_VIEW,
    payload: {module, activeView}
  }
}