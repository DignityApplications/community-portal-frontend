import React, { Component } from 'react';
import './App.css';

import storeFactory from './ReduxStore'
//import initialState from './initialState'
import { Provider } from 'react-redux'
import initialState from './initialState'

import Core from './Core'

const store = storeFactory(initialState)



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Core/>
        </div>
      </Provider>
    );
  }
}

export default App;
