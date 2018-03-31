import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUserLoggedIn } from '../../ReduxStore/Actions'
import { Button, Typography } from 'material-ui';

const mapStateToProps = (state) => {
    return { session: state.session }
}

class LoggedIn extends Component {

    render() {
        return (
            <Typography varient='headline'>
                <Button variant="raised" 
                        color={!this.props.session.loggedIn ? 'primary' : 'secondary'}
                        onClick={(e) => this.props.dispatch(updateUserLoggedIn(!this.props.session.loggedIn))}
                        >
                    {!this.props.session.loggedIn ? 'Login' : 'Logout'}
                </Button>
            </Typography>
        )
    }
}

export default connect(mapStateToProps)(LoggedIn)
