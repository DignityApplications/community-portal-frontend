import React, { Component } from 'react'
import { UserListItem } from '../Components'
import { connect } from 'react-redux'
import { fetchUsersWithRedux } from '../../../ReduxStore/Actions'
import { FormControl, Grid, TextField } from '@material-ui/core'

const mapStateToProps = (state) => {
    return { session: state.session, users: state.users }
  }

class Users extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            startsWithField: 'first_name',
            searchTerm: ''
        }
    }

    handleChange = name => event => { 
        this.setState({ [name]: event.target.value }) 
        this.props.dispatch(fetchUsersWithRedux(
            {role_id: this.props.session.currentRoleID, 
                searchFields: 'first_name,last_name', 
                searchTerm: event.target.value}))
    }

    updateStartsWithField = field => {
        this.setState({startsWithField: field})
        this.props.dispatch(fetchUsersWithRedux(
            {role_id: this.props.session.currentRoleID, sortBy: field, startsWithField: field}))
    }

    render() {
        return (
            <div>
                <Grid container>
                <h1>{this.prpos}</h1>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <TextField id="searchTerm" label="Search Directory" margin="normal"
                                    value={this.state.searchTerm} 
                                    onChange={this.handleChange('searchTerm')}
                                    />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={8} >
                    {this.props.users.map(data => ( <UserListItem key={data.id} id={data.id}
                                avatar_path={data.avatar_path} first_name={data.first_name} last_name={data.last_name} />
                    ))}
                </Grid>
            </div>

        )
    }
}

export default connect(mapStateToProps)(Users)