import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUserWithRedux } from '../../../ReduxStore/Actions'

import { Button, Grid, Input, Select, TextField, Typography } from 'material-ui'
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

const mapStateToProps = (state) => {
    return { session: state.session }
}


class AddUser extends Component {

    state = { first_name: '', last_name: '', email: '', date_of_birth: '', home_phone_number: "", cell_phone_number: "",
              current_address: "", previous_address: "", role_id: 1, open: false, 
              fileName: '', fileObject: '', fileUploadWarning: ''}

    handleCheck = name => event => { this.setState({ [name]: event.target.checked }) }
    handleChange = name => event => { this.setState({ [name]: event.target.value }) }

    handleOpen = () => { this.setState({ open: true }) }
    handleClose = () => { this.setState({ open: false }) }

    handleFileUpload = file => { 
        var extension = file ? file.name.substr(file.name.length - 4) : ''
        if (extension == '.jpg') {
            this.setState({ fileName:file.name, fileObject:file, fileUploadWarning:'' }) 
        } else {
            this.setState({ fileUploadWarning: "Only '.jpg' files may be uploaded"})
        }
    }

    handleSubmit = () => { 
        const { first_name, last_name, email, date_of_birth, role_id, fileObject } = this.state
        if (first_name && last_name && email && date_of_birth && role_id) {
            let password = 'tempPass'

            var formData  = new FormData()
                formData.append("first_name", first_name)
                formData.append("last_name", last_name)
                formData.append("email", email)
                formData.append("password", password)
                formData.append("date_of_birth", date_of_birth)
                formData.append("role_id", role_id)
                formData.append("fileObject", fileObject)
            console.log(formData)

            this.props.dispatch(addUserWithRedux(formData))

            this.setState({ first_name: '', last_name: '', email: '', date_of_birth: '', home_phone_number: "", cell_phone_number: "",
                current_address: "", previous_address: "", role_id: 1, open: false, 
                fileName: '', fileObject: '', fileUploadWarning: ''})
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
                        <FormControl fullWidth>
                            <TextField required id="first_name" label="First Name" margin="normal"
                                    value={this.state.first_name} onChange={this.handleChange('first_name')}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField required id="last_name" label="Last Name" margin="normal"
                                    value={this.state.last_name} onChange={this.handleChange('last_name')}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField required id="email" label="Email" margin="normal" type="email"
                                    value={this.state.email} onChange={this.handleChange('email')}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="date_of_birth" label="Birthday*" type="date" InputLabelProps={{ shrink: true, }} 
                                        value={this.state.date_of_birth}
                                        onChange={this.handleChange("date_of_birth")} style={{marginTop: 20, marginBottom: 20}}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <Select open={this.state.open} onClose={this.handleClose} onOpen={this.handleOpen}
                                    value={this.state.role_id} onChange={this.handleChange("role_id")}
                                    inputProps={{ name: 'role_id', id: 'role_id', }}>
                                <MenuItem value={1}>Member</MenuItem>
                                <MenuItem value={2}>Administrative Staff</MenuItem>
                                <MenuItem value={3}>Guest</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth style={{marginTop: 10}}>
                            <p style={{color:'red'}}>{this.state.fileUploadWarning}</p>
                            <Button variant='raised' color='default'>
                                <Input required type="file" onChange={(e) => this.handleFileUpload(e.target.files[0])} />
                            </Button>
                        </FormControl>
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