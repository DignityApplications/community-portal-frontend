import React, { Component } from 'react'
import { connect } from 'react-redux'

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
