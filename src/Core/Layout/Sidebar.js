import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsersWithRedux, updateActiveView } from '../../ReduxStore/Actions'
import { Button } from 'material-ui'
import { MenuItem, MenuList } from 'material-ui/Menu'

const mapStateToProps = (state) => {
    return { session: state.session, module: state.module, menu: state.menu, view: state.view }
}

class Sidebar extends Component {

    render() {
        return (
            <div>
                {console.log('Sidebar Reloaded')}
                <h1>Sidebar</h1>
            </div>
        )
    }
 } 
 
export default connect(mapStateToProps)(Sidebar)
