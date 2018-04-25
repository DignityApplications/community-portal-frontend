import C from '../Constants'

//ACTIONS FOR SESSION DATA
export const updateUserLoggedIn = loggedIn => { return { type: C.UPDATE_USER_LOGGEDIN, payload: {loggedIn} }}
export const updateModalOpen = modalOpen => { return { type: C.UPDATE_MODAL_OPEN, payload: modalOpen }}
export const updateModalComponent = modalComponent => { return { type: C.UPDATE_MODAL_COMPONENT, payload: modalComponent }}
export const updateCurrentUserID = currentUserID => { return { type: C.UPDATE_CURRENT_USER_ID, payload: currentUserID }}
export const updateCurrentUserPermissions = currentUserPermissions => { return { type: C.UPDATE_CURRENT_USER_PERMISSIONS, payload: currentUserPermissions }}
export const updateUserProfileID = id => { return { type: C.UPDATE_USER_PROFILE_ID, payload: {id} } }
export const updateUserDeleteID = id => { return { type: C.UPDATE_USER_DELETE_ID, payload: {id} } }

//ACTIONS FOR USER DATA
export const updateAllUsers = users => { return { type: C.UPDATE_ALL_USERS, payload: users }}
export const addUser = user => { return { type: C.ADD_USER, payload: {user} }}
export const deleteUser = id => { return { type: C.DELETE_USER, payload: {id} }}

//ACTIONS FOR MODULE DATA
export const updateActiveModule = activeModule => { return { type: C.UPDATE_ACTIVE_MODULE, payload: {activeModule} } }

//ACTIONS FOR MENU DATA
export const updateActiveMenu = menu => { return { type: C.UPDATE_ACTIVE_MENU, payload: {menu} } }

//ACTIONS FOR VIEW DATA
export const updateActiveView = (module, activeView) => { return { type: C.UPDATE_ACTIVE_VIEW, payload: {module, activeView} } }

//MULTI-ACTIONS
export const updateModalOpen_and_ModalComponent = ( component, id ) => (
  dispatch => {
    if ( id ) { dispatch(updateUserDeleteID(id))}
    dispatch(updateModalComponent(component))
    dispatch(updateModalOpen(true))
  }
)
export const updateUserProfileID_and_ActiveView = (id, module, activeView) => (
  dispatch => {
    dispatch(updateUserProfileID(id))
    dispatch(updateActiveView(module, activeView))
  }
)

function loginUser(formData) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/auth/login"
  return fetch(URL, { method: 'POST',
                      headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                      //once we move to prod, change to 'same-origin'
                      credentials: 'include',
                      body: JSON.stringify(formData) } )
     .then( response => Promise.all([response, response.json()]) ) 
}
function logoutUser() {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/auth/logout"
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
function fetchUserPermissions(role_id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + role_id + "/permissions"
  console.log(URL)
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}

function fetchUsers(role_id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + role_id + "/users"
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
function addUsers(user) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/"
  return fetch(URL, { method: 'POST', headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                      credentials: 'include',
                      body: JSON.stringify(user) } )
     .then( response => Promise.all([response, response.json()]) )
}
function deleteUsers(id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + id
  return fetch(URL, { method: 'DELETE', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                      credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}

export const loginUserWithRedux = (formData) => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return loginUser(formData).then(([response, data]) => {
      if(response.status === 200){
        dispatch(updateCurrentUserID(data.user.id))
        return fetchUserPermissions(data.user.role_id).then(([response, permissions]) => {
          if(response.status === 200){
            permissions = permissions.data.map(permission => (permission.name))
            dispatch(updateUserLoggedIn(true))
            dispatch(updateCurrentUserPermissions(permissions))
            dispatch(updateModalOpen(false))
          }
          else {
            //dispatch(fetchPermissionsError())
          }
        })
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}
export const logoutUserWithRedux = () => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return logoutUser().then(([response, users]) =>{
        if(response.status === 200){
        dispatch(updateCurrentUserPermissions([]))
        dispatch(updateCurrentUserID(''))
        dispatch(updateUserProfileID(''))
        dispatch(updateUserDeleteID(''))
        dispatch(updateUserLoggedIn(false))
        dispatch(updateActiveModule('Home'))
      }
      else {
        //dispatch(fetchPostsError())
      }
    })
  }
}

export const fetchUsersWithRedux = role_id => {
    return dispatch => {
      //dispatch(fetchPostsRequest()) Eventuall add this in
      return fetchUsers(role_id).then(([response, users]) =>{
          if(response.status === 200){
          dispatch(updateAllUsers(users.data))
        }
        else {
          //dispatch(fetchPostsError())
        }
      })
    }
}

export const addUserWithRedux = user => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return addUsers(user).then(([response, userData]) =>{
        if(response.status === 201){
        dispatch(addUser(userData.data))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}

export const deleteUserWithRedux = user => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return deleteUsers(user).then(([response, userData]) =>{
        if(response.status === 200){
        dispatch(deleteUser(userData.data[0].id))
        dispatch(updateUserDeleteID(0))
        dispatch(updateModalOpen(false))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}