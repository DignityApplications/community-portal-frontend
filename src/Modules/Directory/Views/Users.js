import React, { Component } from 'react'
import { UserListItem } from '../Components'
import { connect } from 'react-redux'
import { fetchUsersWithRedux } from '../../../ReduxStore/Actions'
import { Button, Grid, Typography } from 'material-ui'

const mapStateToProps = (state) => {
    return { users: state.users }
  }

class Users extends Component {
    
    componentWillMount() {
        this.props.dispatch(fetchUsersWithRedux(1))
    }

    render() {
        return (
            <div>
                <Typography variant="display2">
                    Users
                </Typography>
                <Grid container align="center">
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
                </Grid>
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