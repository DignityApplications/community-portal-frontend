import React, { Component } from 'react'
import { Button, Typography } from 'material-ui'
import { connect } from 'react-redux'
import { updateUserInfo, clearUserInfo } from '../../ReduxStore/Actions'

const mapStateToProps = (state) => {
  return { user: state.user }
}


class Directory extends Component 
{

    constructor(props) {
        super(props);
        this.state = {
          password: '',
          error: false
        };
    
        this.dispatchTest = this.dispatchTest.bind(this)
        this.clear = this.clear.bind(this)
      }
    
    dispatchTest() {
        this.props.dispatch(updateUserInfo( "Corbettg", true, "MyToken"))
    }

    clear() {
        this.props.dispatch(clearUserInfo())
    }
    

    render () {
        return (
            <Typography variant='display2'>
                Directory Module {console.log(this.props.user)}
                <br/>
                <Button onClick={(e) => this.dispatchTest()}>Dispatch Test</Button>
                <br/>
                <Button onClick={(e) => this.clear()}>Clear Test</Button>
            </Typography>
        )
    }

}


export default connect(mapStateToProps)(Directory)