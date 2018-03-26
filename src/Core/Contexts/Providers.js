import React, { Component } from 'react';
import { AuthorizationContext } from '../Contexts'

class AuthorizationProvider extends Component {
  state = {
    loggedIn: false,
    modalOpen: false
  }
  render() {
    return (
      <AuthorizationContext.Provider value={{
        state: this.state,
        toggleLoggedIn: (loggedIn) => this.setState({
          loggedIn: !loggedIn
        })
      }}>
        {this.props.children}
      </AuthorizationContext.Provider>
    )
  }
}

export {
    AuthorizationProvider
}