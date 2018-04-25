import React, { Component } from 'react'
import { updateUserProfileID_and_ActiveView } from '../../../ReduxStore/Actions'
import { connect } from 'react-redux'

import { Avatar, Button, Divider, Grid, Icon, Paper, Typography } from 'material-ui'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class UserListItem extends Component {

    render() {
        return (
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} style={{marginTop:10, marginBottom:10}} >
                <Paper>
                    <Grid container>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} align="center" style={{marginTop:10, marginBottom:10}} >
                            { this.props.avatar_path ? 
                                <Avatar alt={this.props.first_name} src={this.props.avatar_path}
                                        style={{width:150, height:150}} /> :
                                <Avatar alt='No Avatar' src='/images/avatars/no_avatar.png'
                                        style={{width:150, height:150}} /> }
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} align="left" style={{marginTop:10, marginBottom:10}} >
                            <Typography variant='headline'>
                                {this.props.first_name} {this.props.last_name}
                            </Typography>
                            <Divider style={{marginTop:10, marginBottom:10, width:'90%'}} />
                            <Button color="primary" variant="raised" size="medium"
                                    style={{textTransform:"capitalize"}} >Message</Button>
                            <Divider style={{marginTop:10, marginBottom:10, width:'90%'}} />
                            <Button color="primary" variant="raised" size="medium" style={{textTransform:"capitalize"}}
                                    onClick={(e) => 
                                    this.props.dispatch(updateUserProfileID_and_ActiveView(this.props.id, 'Directory', 'Profile'))}>
                                    View Profile</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }

} 

export default connect(mapStateToProps)(UserListItem)