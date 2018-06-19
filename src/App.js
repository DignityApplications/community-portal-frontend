import React, { Component } from 'react';
import './App.css';

import storeFactory from './ReduxStore'
import { Provider } from 'react-redux'
import initialState from './initialState'

import Core from './Core'

//Below I am importing all of the libraries I need to make Material-UI pickers work.
//NOTE: In the documentation, they localize with moment to French. The Default is here so I do not need that
//      I may need to look into localization for other states.
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

const store = storeFactory(initialState)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MuiPickersUtilsProvider utils={MomentUtils} moment={moment} >
            <Core/>
          </MuiPickersUtilsProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
