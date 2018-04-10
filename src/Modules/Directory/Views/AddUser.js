import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../../ReduxStore/Actions'

import { Button, Grid, Select, TextField, Typography } from 'material-ui'
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

const mapStateToProps = (state) => {
    return { session: state.session }
}


class AddUser extends Component {

    state = { first_name: '', last_name: '', email: '', date_of_birth: '', home_phone_number: "", cell_phone_number: "",
              current_address: "", previous_address: "", role: "Member", open: false, }

    handleCheck = name => event => { this.setState({ [name]: event.target.checked }) }
    handleChange = name => event => { this.setState({ [name]: event.target.value }) }

    handleOpen = () => { this.setState({ open: true }) }
    handleClose = () => { this.setState({ open: false }) }

    handleSubmit = () => { 
        const { first_name, last_name, email, date_of_birth, role } = this.state
        let id = Math.floor(Math.random() * 10000);
        if (first_name && last_name && email) {

            const user = { id, first_name, last_name, email, date_of_birth, role }

            this.props.dispatch(addUser(user))

            this.setState({ first_name: '', last_name: '', email: '', date_of_birth: '', home_phone_number: "", cell_phone_number: "",
                current_address: "", previous_address: "", role: "Member", open: false, }) 
        }
    }

      
    render(){
        return (
            <div>
                <Typography variant="display2">
                    Add User Form
                </Typography>
                <Grid container>
                    <Grid item xl={2} lg={2} md={1} sm={1}></Grid>
                    <Grid item xl={8} lg={8} md={11} sm={11} xs={12}>
                        <form>
                            <FormControl fullWidth>
                       
                                <TextField required id="first_name" label="First Name" margin="normal"
                                        value={this.state.first_name} onChange={this.handleChange('first_name')}/>
                                <TextField required id="last_name" label="Last Name" margin="normal"
                                        value={this.state.last_name} onChange={this.handleChange('last_name')}/>

                                <TextField required id="email" label="Email" margin="normal" type="email"
                                        value={this.state.email} onChange={this.handleChange('email')}/>
                           
                                <TextField id="date_of_birth" label="Birthday" type="date" InputLabelProps={{ shrink: true, }} 
                                           value={this.state.date_of_birth}
                                           onChange={this.handleChange("date_of_birth")} style={{marginTop: 20, marginBottom: 20}}/>
                               
                                <Select open={this.state.open} onClose={this.handleClose} onOpen={this.handleOpen}
                                        value={this.state.role} onChange={this.handleChange("role")}
                                        inputProps={{ name: 'role', id: 'role', }}>
                                    <MenuItem value={"Member"}>Member</MenuItem>
                                    <MenuItem value={"AdministrativeStaff"}>Administrative Staff</MenuItem>
                                    <MenuItem value={"Guest"}>Guest</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                        <Button type="submit" variant="raised" color="secondary" onClick={this.handleSubmit}
                                    style={{fontSize: 20, margin: 15}}>Add User</Button>
                    </Grid>
                    <Grid item xl={2} lg={2} md={1} sm={1}></Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddUser)