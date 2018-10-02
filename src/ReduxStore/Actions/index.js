import C from '../Constants'

//ACTIONS FOR SESSION DATA
export const updateUserLoggedIn = loggedIn => { return { type: C.UPDATE_USER_LOGGEDIN, payload: {loggedIn} }}
export const updateModalOpen = modalOpen => { return { type: C.UPDATE_MODAL_OPEN, payload: modalOpen }}
export const updateModalComponent = modalComponent => { return { type: C.UPDATE_MODAL_COMPONENT, payload: modalComponent }}
export const updateSnackBarOpen = snackBarOpen => { return { type: C.UPDATE_SNACKBAR_OPEN, payload: snackBarOpen }}
export const updateSnackBarContent = snackBarContent => { return { type: C.UPDATE_SNACKBAR_CONTENT, payload: snackBarContent }}
export const updateCurrentUserID = currentUserID => { return { type: C.UPDATE_CURRENT_USER_ID, payload: currentUserID }}
export const updateCurrentUserPermissions = currentUserPermissions => { return { type: C.UPDATE_CURRENT_USER_PERMISSIONS, payload: currentUserPermissions }}
export const updateCurrentUserEventReservations = currentUserEventReservations => { return { type: C.UPDATE_CURRENT_USER_EVENT_RESERVATIONS, payload: currentUserEventReservations }}
export const updateProfileID = id => { return { type: C.UPDATE_PROFILE_ID, payload: id } }
export const updateProfileData = user => { return { type: C.UPDATE_PROFILE_DATA, payload: user } }
export const updateProfileDataRole = roleName => { return { type: C.UPDATE_PROFILE_DATA_ROLE, payload: roleName } }
export const updateProfileDataLoaded = loaded => { return { type: C.UPDATE_PROFILE_DATA_LOADED, payload: loaded } }
export const updateCurrentRoleID = id => { return { type: C.UPDATE_CURRENT_ROLE_ID, payload: id } }
export const updateCurrentDeleteID = id => { return { type: C.UPDATE_CURRENT_DELETE_ID, payload: id } }
export const updateCurrentEvent = event => { return {type: C.UPDATE_CURRENT_EVENT, payload: event } }

//ACTIONS FOR MODULE DATA
export const updateActiveModule = activeModule => { return { type: C.UPDATE_ACTIVE_MODULE, payload: {activeModule} } }

//ACTIONS FOR MENU DATA
export const updateActiveMenu = menu => { return { type: C.UPDATE_ACTIVE_MENU, payload: {menu} } }

//ACTIONS FOR VIEW DATA
export const updateActiveView = (module, activeView) => { return { type: C.UPDATE_ACTIVE_VIEW, payload: {module, activeView} } }

//MULTI-ACTIONS
export const updateModalOpen_and_ModalComponent = ( component, data, user_id ) => (
  dispatch => {
    if ( data && data.deleteID ) {dispatch(updateCurrentDeleteID(data.deleteID))}
    if ( data && data.title ) {
      dispatch(updateCurrentEvent(data))
      //fetch all reservations and then do...
      return fetchUserEventReservations(user_id).then(([response, reservations]) => {
        if(response.status === 200){
          dispatch(updateCurrentUserEventReservations(reservations.data))
          dispatch(updateModalComponent(component))
          dispatch(updateModalOpen(true))
        }
        else {
          //dispatch(fetchPermissionsError())
        }
      })
    }
    dispatch(updateModalComponent(component))
    dispatch(updateModalOpen(true))
  }
)
export const updateProfileID_and_ActiveView = (id, module, activeView) => (
  dispatch => {
    dispatch(updateProfileDataLoaded(false))
    dispatch(updateProfileID(id))
    dispatch(updateActiveView(module, activeView))
  }
)

function fetchUserPermissions(role_id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + role_id + "/permissions"
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
function fetchUserEventReservations(id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + id + "/event_reservations"
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// ACTIONS FOR LOGIN/LOGOUT /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function checkUserLoggedIn() {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/auth/status"
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
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

export const checkUserLoggedInWithRedux = () => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return checkUserLoggedIn().then(([response, data]) => {
      if(response.status === 200 && data.loggedin){
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
        dispatch(updateCurrentRoleID(''))
        dispatch(updateCurrentDeleteID(''))
        dispatch(updateUserLoggedIn(false))
        dispatch(updateAllUsers([]))
        dispatch(updateActiveModule('Community'))
      }
      else {
        //dispatch(fetchPostsError())
      }
    })
  }
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// ACTIONS FOR USERS DATA //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
export const updateAllUsers = users => { return { type: C.UPDATE_ALL_USERS, payload: users }}
export const addUserToStore = user => { return { type: C.ADD_USER, payload: user }}
export const updateUser = user => { return { type: C.UPDATE_USER, payload: user }}
export const deleteUser = id => { return { type: C.DELETE_USER, payload: id }}

function fetchUsers(params) {
  const role_id = params.role_id ? params.role_id : 1
  const sortBy = params.sortBy ? params.sortBy : 'first_name'
  const startsWithField = params.startsWithField
  const startsWithLetter = params.startsWithLetter
  const searchFields = params.searchFields
  const searchTerm = params.searchTerm
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + role_id + "/users"
  let URL_PARAMS = ''
  if(sortBy) URL_PARAMS += "?sortBy=" + sortBy
  if(startsWithField) { URL_PARAMS += "&startsWithField=" + startsWithField }
  if(startsWithLetter) { URL_PARAMS += "&startsWithLetter=" + startsWithLetter }
  if(searchFields) { URL_PARAMS += "&searchFields=" + searchFields }
  if(searchTerm) { URL_PARAMS += "&searchTerm=" + searchTerm }
  return fetch(URL + URL_PARAMS, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}

export const fetchUsersWithRedux = params => {
    return dispatch => {
      if (params.role_id) {dispatch(updateCurrentRoleID(params.role_id))}
      //dispatch(fetchPostsRequest()) Eventuall add this in
      return fetchUsers(params).then(([response, users]) =>{
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

function addUser(formData) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/"
  return fetch(URL, { method: 'POST', headers: { 'Accept': 'application/json',}, 
                      credentials: 'include',
                      body: formData } )
     .then( response => Promise.all([response, response.json()]) )
}
export const addUserWithRedux = formData => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return addUser(formData).then(([response, userData]) =>{
        if(response.status === 201){
        dispatch(addUserToStore(userData.data[0]))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}

function updateUserFetch(id, formData) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + id
  return fetch(URL, { method: 'PUT', headers: { 'Accept': 'application/json',},
                      credentials: 'include',
                      body: formData } )
     .then( response => Promise.all([response, response.json()]))
}
export const updateUserWithRedux = (id, formData) => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    dispatch(updateProfileDataLoaded(false))
    return updateUserFetch(id, formData).then(([response, userData]) =>{
        if(response.status === 200){
          dispatch(updateProfileData(userData.data[0]))
          dispatch(updateUser(userData.data[0]))
          dispatch(updateProfileDataLoaded(true))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}

function deleteUsers(id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + id
  return fetch(URL, { method: 'DELETE', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                      credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
export const deleteUserWithRedux = user => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return deleteUsers(user).then(([response, userData]) =>{
        if(response.status === 200){
        dispatch(deleteUser(userData.data[0].id))
        dispatch(updateCurrentDeleteID(0))
        dispatch(updateModalOpen(false))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// ACTIONS FOR EVENTS DATA /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
export const updateAllEvents = events => { return { type: C.UPDATE_ALL_EVENTS, payload: events } }
export const addEventToStore = event => { return { type: C.ADD_EVENT, payload: event }}
export const updateEventInStore = event => { return { type: C.UPDATE_EVENT, payload: event }}
export const deleteEventFromStore = id => { return { type: C.DELETE_EVENT, payload: id }}

function fetchEvents() {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/events/"
  return fetch(URL, { method: 'GET', credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
export const fetchEventsWithRedux = () => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return fetchEvents().then(([response, events]) =>{
      if(response.status === 200){
        dispatch(updateAllEvents(events.data))
      }
      else {
        //dispatch(fetchPostsError())
      }
    })
  }
}

function addEvent(formData) {
  console.log(formData)
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/events/"
  return fetch(URL, { method: 'POST', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},  
                      credentials: 'include',
                      body: JSON.stringify(formData) } )
     .then( response => Promise.all([response, response.json()]))
}
export const addEventWithRedux = (formData) => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return addEvent(formData).then(([response, event]) =>{
      if(response.status === 201){
        dispatch(addEventToStore(event.data[0]))
      }
      else {
        console.log(event)
        //dispatch(fetchPostsError())
      }
    })
  }
}
function updateEvent(id, formData) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/events/" + id
  return fetch(URL, { method: 'PUT', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},  
                      credentials: 'include',
                      body: JSON.stringify(formData) } )
     .then( response => Promise.all([response, response.json()]))
}
export const updateEventWithRedux = (id, formData) => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return updateEvent(id, formData).then(([response, event]) =>{
      if(response.status === 200){
        dispatch(updateCurrentEvent(event.data[0]))
        dispatch(updateEventInStore(event.data[0]))
      }
      else {
        console.log(event)
        //dispatch(fetchPostsError())
      }
    })
  }
}

function deleteEvent(id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/events/" + id
  return fetch(URL, { method: 'DELETE', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                      credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
export const deleteEventWithRedux = eventID => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return deleteEvent(eventID).then(([response, event]) =>{
        if(response.status === 200){
          console.log('Deleting Event: ' + event.data[0].id)
        dispatch(deleteEventFromStore(event.data[0].id))
        dispatch(updateModalOpen(false))
        dispatch(updateCurrentEvent(""))
      }
      else{
        //dispatch(fetchPostsError())
        console.log(event)
      }
    })
  }
}

//ACTIONS FOR EVENT RESERVATIONS
export const addCurrentUserEventReservationToStore = reservation => { return { type: C.ADD_CURRENT_USER_EVENT_RESERVATION, payload: reservation }}
export const updateCurrentUserEventReservationInStore = reservation => { return { type: C.UPDATE_CURRENT_USER_EVENT_RESERVATION, payload: reservation }}
export const deleteCurrentUserEventReservationFromStore = id => { return { type: C.DELETE_CURRENT_USER_EVENT_RESERVATION, payload: id }}

function addReservation(formData) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/event_reservations/"
  return fetch(URL, { method: 'POST', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},  
                      credentials: 'include',
                      body: JSON.stringify(formData) } )
     .then( response => Promise.all([response, response.json()]))
}
export const addReservationtWithRedux = (formData) => {
  console.log(formData)
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return addReservation(formData).then(([response, reservation]) =>{
      if(response.status === 201){
        dispatch(addCurrentUserEventReservationToStore(reservation.data[0]))
      }
      else {
        //dispatch(fetchReservationError())
      }
    })
  }
}

function updateReservation(id, formData) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/event_reservations/" + id
  return fetch(URL, { method: 'PUT', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},  
                      credentials: 'include',
                      body: JSON.stringify(formData) } )
     .then( response => Promise.all([response, response.json()]))
}
export const updateReservationWithRedux = (id, formData) => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return updateReservation(id, formData).then(([response, reservation]) =>{
      if(response.status === 200){
        dispatch(updateCurrentUserEventReservationInStore(reservation.data[0]))
      }
      else {
        //dispatch(fetchPostsError())
      }
    })
  }
}

function deleteReservation(id) {
  const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/event_reservations/" + id
  return fetch(URL, { method: 'DELETE', headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                      credentials: 'include' } )
     .then( response => Promise.all([response, response.json()]))
}
export const deleteReservationWithRedux = eventID => {
  return dispatch => {
    //dispatch(fetchPostsRequest()) Eventuall add this in
    return deleteReservation(eventID).then(([response, reservation]) =>{
        if(response.status === 200){
        dispatch(deleteCurrentUserEventReservationFromStore(reservation.data[0].id))
      }
      else{
        //dispatch(fetchPostsError())
      }
    })
  }
}