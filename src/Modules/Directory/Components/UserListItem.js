import React, { Component } from 'react'
import { updateUserProfileID_and_ActiveView } from '../../../ReduxStore/Actions'
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
                <Avatar alt={this.props.firstName} src={`/images/${this.props.avatar}`} />
                <ListItemText primary={`${this.props.first_name} ${this.props.last_name}`} />
                <ListItemSecondaryAction>
                    <Button color="default" variant="raised" 
                            onClick={(e) => 
                            this.props.dispatch(updateUserProfileID_and_ActiveView(this.props.id, 'Directory', 'Profile'))}>
                            View Profile</Button>
                    <Button color="primary"><Icon>edit_icon</Icon></Button>
                    <Button color="secondary"><Icon>delete</Icon></Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

} 

export default connect(mapStateToProps)(UserListItem)