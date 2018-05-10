import React, { Component } from 'react'
import { UserListItem } from '../Components'
import { connect } from 'react-redux'
import { fetchUsersWithRedux } from '../../../ReduxStore/Actions'
import { Button, Grid, Input, Typography } from 'material-ui'
import { MenuItem, MenuList } from 'material-ui/Menu'

const mapStateToProps = (state) => {
    return { users: state.users }
  }

class Users extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            sortingOptions: ['ALL', 'A','B','C','D','E','F','G','H',
                             'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xl={2} lg={2} md={2} >
                        <MenuList>
                            <MenuItem style={{background:'lightblue'}}>First Name</MenuItem> 
                            <MenuItem>Last Name</MenuItem> 
                        </MenuList>
                    </Grid>
                    <Grid item xl={7} lg={7} md={7} >
                        {this.state.sortingOptions.map( letter => {
                         return <Button style={letter === 'ALL' ? {background: 'lightblue'} : null}
                                        variant="raised" size="small" key={letter} onClick={(e) => console.log(e)}> 
                                    {letter}  </Button> 
                        })}
                    </Grid>
                    <Grid item xl={3} lg={3} md={3}>
                        <Input placeholder='First Name Search' />
                        <Input placeholder='Last Name Search' />
                    </Grid>
                </Grid>
                <hr/>
                {/* <Grid container align="center">
                    <Grid item xl={6} lg={6} md={6} >
                        <Button variant="raised" color="primary" size="large"
                                onClick={(e) => this.props.dispatch(fetchUsersWithRedux(1))} >
                            Members</Button>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6}>
                    <Button variant="raised" color="primary" size="large"
                                onClick={(e) => this.props.dispatch(fetchUsersWithRedux(2))} >
                            Staff</Button>
                    </Grid>
                </Grid> */}
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