import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsersWithRedux, updateActiveView } from '../../ReduxStore/Actions'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'

const mapStateToProps = (state) => {
    return { session: state.session, module: state.module, menu: state.menu, view: state.view }
}

class Menu extends Component {

    render() {
        return (
              <List className="subMenuList">
                {console.log('Menu Reloaded')}
                {
                    this.props.menu[this.props.module.activeModule].map( (link) => {
                        if (link.role_id) {  
                            if (this.props.session.currentUserPermissions.includes(link.requiredPermission)) {
                                let activeModuleView = this.props.view.activeView.filter(
                                    module => { return module.Module === this.props.module.activeModule })
                                var data = {"role_id": link.role_id, "module": "Directory", "view": link.view}
                                return  <ListItem key={link.title} 
                                              button onClick={(e) => this.props.dispatch(fetchUsersWithRedux(data))}>
                                        <ListItemText>
                                            <Typography className={activeModuleView[0].View === link.view ? "activeMenuListItem" : "menuListItem"}>
                                                {link.title} 
                                            </Typography>
                                        </ListItemText>
                                    </ListItem> 
                            }
                        } else {
                            let activeModuleView = this.props.view.activeView.filter(
                                module => { return module.Module === this.props.module.activeModule })
                            return  <ListItem key={link.title}
                                        button onClick={(e) => this.props.dispatch(updateActiveView(this.props.module.activeModule, link.view))}>
                                        <ListItemText >
                                            <Typography className={activeModuleView[0].View === link.view ? "activeMenuListItem" : "menuListItem"} >
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