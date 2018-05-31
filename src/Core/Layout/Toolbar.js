import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule } from '../../ReduxStore/Actions'
import { Divider, Hidden, Icon, Grid, 
         List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'


const mapStateToProps = (state) => {
    return { module: state.module, session: state.session }
}

class Toolbar extends Component {

    render() {

        return (
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align={'center'}> 
                    <Icon style={{fontSize: 100, color:'#FFF'}}>supervisor_account</Icon>
                    <List component="nav" >
                        <Divider style={{background:"#FFFFFF", height:2,}} component='hr' />
                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Home"))} disableGutters
                                  className={this.props.module.activeModule === 'Home' ? 'activeToolbarItem' : 'toolbarItem'} >
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>home</Icon><br/>
                                <Typography>Home</Typography>
                            </ListItemText>
                        </ListItem>
                        <Divider style={{background:"#FFFFFF", height:2}} component='hr' />
                        {this.props.session.loggedIn ? <div>
                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Directory"))} disableGutters
                                  className={this.props.module.activeModule === 'Directory' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>account_circle</Icon><br/>
                                <Typography>Directory</Typography>
                            </ListItemText>
                        </ListItem> 
                        <Divider style={{background:"#FFFFFF", height:2,}} component='hr' /> 
                        <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Events"))} disableGutters
                                  className={this.props.module.activeModule === 'Events' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>event</Icon><br/>
                                <Typography>Events</Typography>
                            </ListItemText>
                        </ListItem>
                        <Divider style={{background:"#FFFFFF", height:2}} component='hr' />
                        <ListItem button disableGutters
                                  className={this.props.module.activeModule === 'Dining' ? 'activeToolbarItem' : 'toolbarItem'}>
                            <ListItemText align='center'>
                                <Icon style={{fontSize:50}}>fastfood</Icon><br/>
                                <Typography>Dining</Typography>
                            </ListItemText>
                        </ListItem> 
                        <Divider style={{background:"#FFFFFF", height:2}} component='hr' /></div>
                        : 
                        null}
                    </List>
                </Grid>
            </Grid>
        )
    }

}

export default connect(mapStateToProps)(Toolbar)