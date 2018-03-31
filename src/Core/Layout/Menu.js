import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveView } from '../../ReduxStore/Actions'
import { MenuItem, MenuList } from 'material-ui/Menu'

const mapStateToProps = (state) => {
    return { module: state.module, menu: state.menu }
}

class Menu extends Component {

    render() {
        return (
            <MenuList>
                {console.log('Menu Reloaded')}
                {
                    this.props.menu[this.props.module.activeModule].map( (link) => {
                        return <MenuItem key={link.title}
                            onClick={(e) => this.props.dispatch(updateActiveView(this.props.module.activeModule, link.view))}>
                                {link.title} 
                                </MenuItem> 
                    })
                }
            </MenuList>
        )
    }
 } 
 
export default connect(mapStateToProps)(Menu)