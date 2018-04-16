import C from '../Constants'

//ACTIONS FOR SESSION DATA
export const updateUserLoggedIn = loggedIn => { return { type: C.UPDATE_USER_LOGGEDIN, payload: {loggedIn} }}
export const updateModalOpen = modalOpen => { return { type: C.UPDATE_MODAL_OPEN, payload: modalOpen }}
export const updateModalComponent = modalComponent => { return { type: C.UPDATE_MODAL_COMPONENT, payload: modalComponent }}
export const updateCurrentUserID = currentUserID => { return { type: C.UPDATE_CURRENT_USER_ID, payload: {currentUserID} } }
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


function fetchUsers() {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/"
  return fetch(URL, { method: 'GET' } )
     .then( response => Promise.all([response, response.json()]))
}
function addUsers(user) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/"
  return fetch(URL, { method: 'POST', headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                      body: JSON.stringify(user) } )
     .then( response => Promise.all([response, response.json()]) )
}
function deleteUsers(id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + id
  return fetch(URL, { method: 'DELETE', headers: { 'Accept': 'application/json','Content-Type': 'application/json'} } )
     .then( response => Promise.all([response, response.json()]))
}

export const fetchUsersWithRedux = () => {
    return dispatch => {
      //dispatch(fetchPostsRequest()) Eventuall add this in
      return fetchUsers().then(([response, users]) =>{
          if(response.status === 200){
          dispatch(updateAllUsers(users.data))
        }
        else{
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