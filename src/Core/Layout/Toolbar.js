import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule } from '../../ReduxStore/Actions'
import { Button, Divider, Drawer, Hidden, Icon, Grid, Typography } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';


const mapStateToProps = (state) => {
    return { module: state.module, session: state.session }
}

class Toolbar extends Component {

    state = { mobileOpen: false, }
    
    handleDrawerToggle = () => { this.setState({ mobileOpen: !this.state.mobileOpen }); }

    render() {

        const drawer = (
            <div >
                <div style={{width: '225px'}}></div>
                <Typography variant='title' style={{color:"#FFFFFF", fontFamily:'Rambla', 
                            textTransform:'uppercase', letterSpacing:3 }}>
                        <Icon style={{fontSize: 50, marginBottom:-10, paddingRight:20}}>supervisor_account</Icon>
                        Community
                </Typography>
                <Divider inset style={{marginTop:10,marginBottom:10, background:"#FFFFFF", height:5}} component='hr' />
                <List component="nav">
                    <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Home"))}>
                        <ListItemIcon>
                            <Icon style={{color: "#FFFFFF"}}>home</Icon>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography style={{color:"#FFFFFF", fontFamily:'Rambla', 
                                    textTransform:'uppercase', letterSpacing:3 }}>
                                HOME
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider style={{background:"#FFFFFF", height:2, width:'90%'}} component='hr' />
                    {this.props.session.loggedIn ? <div>
                    <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Directory"))}>
                        <ListItemIcon>
                            <Icon style={{color: "#FFFFFF"}}>account_circle</Icon>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography style={{color:"#FFFFFF", fontFamily:'Rambla', 
                                    textTransform:'uppercase', letterSpacing:3 }}>
                                Directory
                            </Typography>
                        </ListItemText>
                    </ListItem> 
                    <Divider style={{background:"#FFFFFF", height:2, width:'90%'}} component='hr' />
                    <ListItem button onClick={(e) => this.props.dispatch(updateActiveModule("Events"))}>
                        <ListItemIcon>
                            <Icon style={{color: "#FFFFFF"}}>event</Icon>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography style={{color:"#FFFFFF", fontFamily:'Rambla', 
                                    textTransform:'uppercase', letterSpacing:3 }}>
                                Events
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider style={{background:"#FFFFFF", height:2, width:'90%'}} component='hr' />
                    <ListItem button >
                        <ListItemIcon>
                            <Icon style={{color: "#FFFFFF"}}>fastfood</Icon>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography style={{color:"#FFFFFF", fontFamily:'Rambla', 
                                    textTransform:'uppercase', letterSpacing:2 }}>
                                Dining
                            </Typography>
                        </ListItemText>
                    </ListItem> 
                    <Divider style={{background:"#FFFFFF", height:2, width:'90%'}} component='hr' /></div>
                    : 
                    null}
                </List>
            </div>
        )
      
        return (
            <Grid container >
                <Hidden mdUp>
                    <Drawer 
                        variant="temporary"
                        anchor='left'
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer 
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </Grid>
        )
    }

}

export default connect(mapStateToProps)(Toolbar)