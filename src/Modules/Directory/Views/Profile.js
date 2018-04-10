import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../../ReduxStore/Actions'
import { Typography } from 'material-ui'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class Profile extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            userData: {
                first_name: 'Garret',
                last_name: 'Corbett'
            }
        }
    }

    componentWillMount() {
        //Here I will Make a call to the API for a specific user and with what is returned, format the prfile page below
        //call will look like fetch(API/this.props.session.currentUserProfileID)
    }

    render(){
        return (
            <div>
                <Typography variant="display2">
                    Profile for {this.state.userData.first_name} <br/>
                    ID Passed: {this.props.session.currentUserProfileID}
                </Typography>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Profile)