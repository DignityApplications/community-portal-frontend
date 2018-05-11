import React, { Component } from 'react'
import { UserListItem } from '../Components'
import { connect } from 'react-redux'
import { fetchUsersWithRedux } from '../../../ReduxStore/Actions'
import { AppBar, Button, Grid, Input, Tabs, Typography } from 'material-ui'
import { MenuItem, MenuList } from 'material-ui/Menu'
import { Tab } from 'material-ui/Tabs'

const mapStateToProps = (state) => {
    return { session: state.session, users: state.users }
  }

class Users extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            sortingOptions: ['A','B','C','D','E','F','G','H','I','J','K','L',
                             'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            startsWithField: 'first_name'
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };

    updateStartsWithField = field => {
        this.setState({startsWithField: field})
        this.props.dispatch(fetchUsersWithRedux(
            {role_id: this.props.session.currentRoleID, sortBy: field, startsWithField: field}))
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xl={3} lg={3} md={3} >
                        <MenuList>
                            <MenuItem style={this.state.startsWithField === 'first_name' ?{background:'lightblue'} : null}
                                onClick={(e) => this.updateStartsWithField('first_name')}>First Name</MenuItem> 
                            <MenuItem style={this.state.startsWithField === 'last_name' ?{background:'lightblue'} : null}
                                onClick={(e) => this.updateStartsWithField('last_name')}>Last Name</MenuItem> 
                        </MenuList>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} >
                            <div>
                                {this.state.sortingOptions.map( letter => {
                                return <span style={{margin: 5, float: 'left', padding: 10, border: '1px solid #000', cursor: 'pointer'}}
                                         key={letter}
                                         onClick={(e) => this.props.dispatch(
                                            fetchUsersWithRedux({role_id: this.props.session.currentRoleID, 
                                                                 sortBy: this.state.startsWithField, 
                                                                 startsWithField: this.state.startsWithField, 
                                                                 startsWithLetter: letter}))}> 
                                         {letter}</span>
                                       
                                            
                                })}
                            </div>
                    </Grid>
                </Grid>
                <hr/>
                <Grid container>
                    {this.props.users.map(data => ( <UserListItem key={data.id} id={data.id}
                                avatar_path={data.avatar_path} first_name={data.first_name} last_name={data.last_name} />
                    ))}
                </Grid>
            </div>

        )
    }
}

export default connect(mapStateToProps)(Users)