import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUserWithRedux, updateModalOpen_and_ModalComponent } from '../../ReduxStore/Actions'
import { Button, Typography } from '@material-ui/core';

const mapStateToProps = (state) => {
    return { session: state.session }
}

class LoggedIn extends Component {

    render() {
        return (
            <Typography varient='headline' style={{padding: 5}}>
                {this.props.session.loggedIn ? 
                    <Button variant="raised" style={{background: "#FF2C00", color: "#FFF", fontWeight: "bolder"}} 
                            onClick={(e) => this.props.dispatch(logoutUserWithRedux())} >
                            Logout </Button> :
                    <Button variant="raised" color='primary' 
                    onClick={(e) => this.props.dispatch(updateModalOpen_and_ModalComponent('login'))} >
                    Login </Button> 
                }
            </Typography>
        )
    }
}

export default connect(mapStateToProps)(LoggedIn)
