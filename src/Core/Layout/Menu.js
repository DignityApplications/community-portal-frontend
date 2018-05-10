import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsersWithRedux, updateActiveView } from '../../ReduxStore/Actions'
import { MenuItem, MenuList } from 'material-ui/Menu'

const mapStateToProps = (state) => {
    return { session: state.session, module: state.module, menu: state.menu, view: state.view }
}

class Menu extends Component {

    render() {
        return (
            <MenuList>
                {console.log('Menu Reloaded')}
                {
                    this.props.menu[this.props.module.activeModule].map( (link) => {
                        if (link.role_id) {  
                            if (this.props.session.currentUserPermissions.includes(link.requiredPermission)) {
                            var data = {"role_id": link.role_id, "module": "Directory", "view": link.view}
                            console.log(this.props.view.activeView.includes(this.props.module.activeModule))
                            return <MenuItem key={link.title} 
                                style={(this.props.view.activeView[1].View === link.view )? {background: 'lightblue'} : null}
                                onClick={(e) => this.props.dispatch(fetchUsersWithRedux(data))}>
                                    {link.title} 
                                    </MenuItem> 
                            }
                        } else {
                            return <MenuItem key={link.title}
                                onClick={(e) => this.props.dispatch(updateActiveView(this.props.module.activeModule, link.view))}>
                                    {link.title} 
                                    </MenuItem> 
                        }
                    })
                }
            </MenuList>
        )
    }
 } 
 
export default connect(mapStateToProps)(Menu)