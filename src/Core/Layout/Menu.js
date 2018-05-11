import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsersWithRedux, updateActiveView } from '../../ReduxStore/Actions'
import { Divider, Icon, Typography } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const mapStateToProps = (state) => {
    return { session: state.session, module: state.module, menu: state.menu, view: state.view }
}

class Menu extends Component {

    render() {
        return (
              <List>
                {console.log('Menu Reloaded')}
                {
                    this.props.menu[this.props.module.activeModule].map( (link) => {
                        if (link.role_id) {  
                            if (this.props.session.currentUserPermissions.includes(link.requiredPermission)) {
                            var data = {"role_id": link.role_id, "module": "Directory", "view": link.view}
                            return  <ListItem key={link.title} 
                                              button onClick={(e) => this.props.dispatch(fetchUsersWithRedux(data))}>
                                        <ListItemText>
                                            <Typography style={{color:"rgba(0,0,0,.7)", fontFamily:'Rambla', 
                                                    textTransform:'uppercase', letterSpacing:2 }}>
                                                {link.title} 
                                            </Typography>
                                        </ListItemText>
                                    </ListItem> 
                            }
                        } else {
                            return  <ListItem key={link.title}
                                        button onClick={(e) => this.props.dispatch(updateActiveView(this.props.module.activeModule, link.view))}>
                                        <ListItemText>
                                            <Typography style={{color:"rgba(0,0,0,.7)", fontFamily:'Rambla', 
                                                    textTransform:'uppercase', letterSpacing:2 }}>
                                                {link.title} 
                                            </Typography>
                                        </ListItemText>
                                    </ListItem> 
                        }
                    })
                }
            </List>
        )
    }
 } 
 
export default connect(mapStateToProps)(Menu)