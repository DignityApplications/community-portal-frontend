import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule } from '../../ReduxStore/Actions'
import { Divider, Hidden, Icon, Grid, 
         List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'

import { LoggedIn } from '../Components'


const mapStateToProps = (state) => {
    return { module: state.module, session: state.session }
}

class Toolbar extends Component {

    render() {

        return (
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align={'center'}> 

                    <Icon style={{fontSize: 100, color:'#FFF'}}>store</Icon>
                    <List component="nav" >
                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Events"))} disableGutters
                                  className={this.props.module.activeModule === 'Account' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>account_circle</Icon><br/>
                                <Typography>Events</Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Community"))} disableGutters
                                  className={this.props.module.activeModule === 'Community' ? 'activeToolbarItem' : 'toolbarItem'} >
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>home</Icon><br/>
                                <Typography>Community</Typography>
                            </ListItemText>
                        </ListItem>
                        
                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Directory"))} disableGutters
                                  className={this.props.module.activeModule === 'Directory' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>supervisor_account</Icon><br/>
                                <Typography>Directory</Typography>
                            </ListItemText>
                        </ListItem> 

                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Events"))} disableGutters
                                  className={this.props.module.activeModule === 'Events' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>event</Icon><br/>
                                <Typography>Events</Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem button disableGutters
                                  className={this.props.module.activeModule === 'Dining' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>fastfood</Icon><br/>
                                <Typography>Dining</Typography>
                            </ListItemText>
                        </ListItem> 

                    </List>

                    <LoggedIn /> 
                </Grid>
            </Grid>
        )
    }

}

export default connect(mapStateToProps)(Toolbar)