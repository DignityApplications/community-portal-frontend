const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    loggedIn: false
}

const user = (state = initialState, action) => {

  switch(action.type) {
    case 'USER_LOGGEDIN':
        return action.payload

    default:
        return state
  }

}

export default user