import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsersWithRedux } from '../../ReduxStore/Actions'
import { AddUser, Home, Profile, Users } from './Views'

const mapStateToProps = (state) => {
  return { session: state.session, menu: state.menu, users: state.users, view: state.view }
}


class Directory extends Component 
{
    componentWillMount() {
        let data = { role_id: 1}
        this.props.dispatch(fetchUsersWithRedux(data))
    }
    renderView(view) {
        switch(view) {
            case 'Member':
                return <Users updateActiveView={this.updateActiveView}/>
            case 'Staff':
                return <Users updateActiveView={this.updateActiveView}/>
            case 'WebAdmin':
                return <Users updateActiveView={this.updateActiveView}/>
            case 'Guest':
                return <Users updateActiveView={this.updateActiveView}/>
            case 'AddUser':
                return <AddUser/>
            case 'Profile':
                return <Profile/>
            default:
                return <Home />
                
        }
    }

    render () {
        return (
            <div>
                {this.renderView(this.props.view.activeView[1].View)}
            </div>
        )
    }
}


export default connect(mapStateToProps)(Directory)