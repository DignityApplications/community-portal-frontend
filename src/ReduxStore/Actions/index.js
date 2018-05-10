import C from '../Constants'

//ACTIONS FOR SESSION DATA
export const updateUserLoggedIn = loggedIn => { return { type: C.UPDATE_USER_LOGGEDIN, payload: {loggedIn} }}
export const updateModalOpen = modalOpen => { return { type: C.UPDATE_MODAL_OPEN, payload: modalOpen }}
export const updateModalComponent = modalComponent => { return { type: C.UPDATE_MODAL_COMPONENT, payload: modalComponent }}
export const updateCurrentUserID = currentUserID => { return { type: C.UPDATE_CURRENT_USER_ID, payload: currentUserID }}
export const updateCurrentUserPermissions = currentUserPermissions => { return { type: C.UPDATE_CURRENT_USER_PERMISSIONS, payload: currentUserPermissions }}
export const updateProfileID = id => { return { type: C.UPDATE_PROFILE_ID, payload: {id} } }
export const updateProfileData = user => { return { type: C.UPDATE_PROFILE_DATA, payload: {user} } }
export const updateProfileDataRole = roleName => { return { type: C.UPDATE_PROFILE_DATA_ROLE, payload: roleName } }
export const updateProfileDataLoaded = loaded => { return { type: C.UPDATE_PROFILE_DATA_LOADED, payload: loaded } }
export const updateDeleteID = id => { return { type: C.UPDATE_DELETE_ID, payload: {id} } }

//ACTIONS FOR USER DATA
export const updateAllUsers = users => { return { type: C.UPDATE_ALL_USERS, payload: users }}
export const addUser = user => { return { type: C.ADD_USER, payload: {user} }}
export const updateUser = user => { return { type: C.UPDATE_USER, payload: {user} }}
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
    if ( id ) { dispatch(updateDeleteID(id))}
    dispatch(updateModalComponent(component))
    dispatch(updateModalOpen(true))
  }
)
export const updateProfileID_and_ActiveView = (id, module, activeView) => (
  dispatch => {
    dispatch(updateProfileID(id))
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
function fetchUserRoleName(role_id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + role_id
  console.log(URL)
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}

function fetchUsers(role_id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + role_id + "/users"
  const URL_PARAMS = "?sortBy=first_name"
  return fetch(URL + URL_PARAMS, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
function addUsers(user) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/"
  return fetch(URL, { method: 'POST', headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                      credentials: 'include',
                      body: JSON.stringify(user) } )
     .then( response => Promise.all([response, response.json()]) )
}
function updateUserFetch(id, updateInfo) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + id
  return fetch(URL, { method: 'PUT', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                      credentials: 'include',
                      body: JSON.stringify(updateInfo) } )
     .then( response => Promise.all([response, response.json()]))
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
        dispatch(updateProfileID(''))
        dispatch(updateProfileDataLoaded(false))
        dispatch(updateProfileData([]))
        dispatch(updateDeleteID(''))
        dispatch(updateUserLoggedIn(false))
        dispatch(updateAllUsers([]))
        dispatch(updateActiveModule('Home'))
      }
      else {
        //dispatch(fetchPostsError())
      }
    })
  }
}

export const fetchUsersWithRedux = params => {
    return dispatch => {
      let role_id = params.role_id ? params.role_id : params
      console.log(role_id)
      //dispatch(fetchPostsRequest()) Eventuall add this in
      return fetchUsers(role_id).then(([response, users]) =>{
          if(response.status === 200){
          dispatch(updateAllUsers(users.data))
          dispatch(updateActiveView(params.module, params.view))
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

export const updateUserWithRedux = (id, updateInfo) => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    dispatch(updateProfileDataLoaded(false))
    return updateUserFetch(id, updateInfo).then(([response, userData]) =>{
        if(response.status === 200){
          dispatch(updateProfileData(userData.data))
          dispatch(updateUser(userData.data))
          let role_id = userData.data[0].role_id
          return fetchUserRoleName(role_id).then(([response, userData]) =>{
            if(response.status === 200){
              let roleName = userData.data[0].name
              dispatch(updateProfileDataRole(roleName))
              dispatch(updateProfileDataLoaded(true))
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

export const deleteUserWithRedux = user => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return deleteUsers(user).then(([response, userData]) =>{
        if(response.status === 200){
        dispatch(deleteUser(userData.data[0].id))
        dispatch(updateDeleteID(0))
        dispatch(updateModalOpen(false))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}