import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule, updateUserInfo, clearUserInfo } from '../../ReduxStore/Actions'
import { AddUser, Profile, Users } from './Views'

const mapStateToProps = (state) => {
  return { menu: state.menu, user: state.user, view: state.view }
}

const allUsers = [{avatar:'Garret.jpg',firstName:'Garret',lastName:'Corbett'}, 
                  {avatar:'Elliot.jpg', firstName:'Elliot',lastName:'Simpson'}]

class Directory extends Component 
{
    renderModule(view) {
        switch(view) {
            case 'AddUser':
                return <AddUser/>
            case 'Profile':
                return <Profile/>
            case 'Users':
                return <Users users={allUsers} />
            default:
                return <Users users={allUsers} />
                
        }
    }

    render () {
        return (
            <div>
                {this.renderModule(this.props.view.activeView[1].View)}
            </div>
        )
    }
}


export default connect(mapStateToProps)(Directory)