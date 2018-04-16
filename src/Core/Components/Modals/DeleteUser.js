import React, { Component } from 'react'
import {  deleteUserWithRedux, updateModalOpen } from '../../../ReduxStore/Actions'
import { connect } from 'react-redux'

import { Button, Typography } from 'material-ui'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class UserListItem extends Component {

    render() {
        return (
            <div>
                <Typography variant='title'>
                    Delete User Confirmation:
                </Typography>
                <Button color="secondary" onClick={(e) => this.props.dispatch(updateModalOpen(false))}>
                        No</Button>
                <Button color="secondary" onClick={(e) => this.props.dispatch(deleteUserWithRedux(this.props.session.currentUserDeleteID))}>
                        Yes</Button>
            </div>
        )
    }

} 

export default connect(mapStateToProps)(UserListItem)