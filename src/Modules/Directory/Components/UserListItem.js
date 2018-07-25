import React, { Component } from 'react'
import { updateProfileID_and_ActiveView } from '../../../ReduxStore/Actions'
import { connect } from 'react-redux'

import { Avatar, Button, Divider, Grid, Icon, Paper, Typography } from '@material-ui/core'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class UserListItem extends Component {

    render() {
        return (
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} style={{padding:"2%"}}>
                <Paper elevation={4} style={{padding: "10px 10px"}}>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center" style={{marginTop:10, marginBottom:10}} >
                            { this.props.avatar_path ? 
                                <Avatar alt={this.props.first_name} 
                                        src={'https://sleepy-plateau-42917.herokuapp.com' + this.props.avatar_path}
                                        style={{width:150, height:150}} /> :
                                <Avatar alt='No Avatar' src='/images/avatars/no_avatar.png'
                                        style={{width:150, height:150}} /> }
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center" style={{marginTop:10, marginBottom:10}} >
                            <Typography variant='headline'>
                                {this.props.first_name} {this.props.last_name}
                            </Typography>
                            <Divider style={{marginTop:10, marginBottom:10, width:'90%'}} />

                            <Typography variant='body1' align="left">
                                <Icon style={{paddingLeft: 5}}>mail</Icon> {this.props.email}
                            </Typography>

                            <Typography variant='body1' align="left">
                                <Icon style={{paddingLeft: 5}}>phone</Icon> {this.props.cell_phone_number}
                            </Typography>

                            <Button color="primary" variant="raised" size="medium" 
                                    style={{textTransform:"capitalize", fontWeight: "bold", backgroundColor: "#FF8500" }}
                                    onClick={(e) => 
                                    this.props.dispatch(updateProfileID_and_ActiveView(this.props.id, 'Directory', 'Profile'))}>
                                    View Profile</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }

} 

export default connect(mapStateToProps)(UserListItem)