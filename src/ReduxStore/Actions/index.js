import C from '../Constants'

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
