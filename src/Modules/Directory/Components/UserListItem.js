import React, { Component } from 'react'
import { updateModalOpen_and_ModalComponent, updateUserProfileID_and_ActiveView } from '../../../ReduxStore/Actions'
import { connect } from 'react-redux'

import { Avatar, Button, Icon } from 'material-ui'
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class UserListItem extends Component {

    render() {
        return (
            <ListItem>
                { this.props.avatar_path ? <Avatar alt={this.props.first_name} src={this.props.avatar_path} /> :
                                      <Icon color="primary" style={{fontSize: 50}}>account_circle</Icon> }
                <ListItemText primary={`${this.props.first_name} ${this.props.last_name}`} />
                <ListItemSecondaryAction>
                    <Button color="secondary" variant="raised" 
                            onClick={(e) => 
                            this.props.dispatch(updateUserProfileID_and_ActiveView(this.props.id, 'Directory', 'Profile'))}>
                            View Profile</Button>
                    <Button color="secondary" onClick={(e) => 
                        this.props.dispatch(updateModalOpen_and_ModalComponent('deleteUser', this.props.id))}>
                        <Icon>delete</Icon>
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

} 

export default connect(mapStateToProps)(UserListItem)