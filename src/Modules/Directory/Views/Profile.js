import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUserWithRedux, updateProfileData, updateProfileDataRole, updateProfileDataLoaded } from '../../../ReduxStore/Actions'
import { Avatar, Grid, Icon, IconButton, Paper, Typography } from '@material-ui/core'
import { EditDateTextField, EditProfileImage, EditSelectField, EditTextArea, EditTextField } from '../Components'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            editingField: '',
        }
        this.cancelEditingField = this.cancelEditingField.bind(this)
        this.completeEditingField = this.completeEditingField.bind(this)
    }

    componentWillMount() {
        const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + this.props.session.currentProfileID
        return fetch(URL, { method: 'GET', credentials: 'include' } )
            .then( response => response.json() )
            .then( user => {
                this.props.dispatch(updateProfileData(user.data[0])) 
                const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/roles/" + this.props.session.currentProfileData.role_id
                return fetch(URL, { method: 'GET', credentials: 'include' } )
                    .then( response => response.json() )
                    .then( permission => { 
                        this.props.dispatch(updateProfileDataRole(permission.data[0].name )) 
                        this.props.dispatch(updateProfileDataLoaded(true))
                    })
                    .catch( error => console.log(error) )
            })
            .catch( error => console.log(error) )
    }

    formatBirthday = birthday => {
        let date = new Date(birthday);
        let d = date.getDate() + 1
        let m = date.getMonth() + 1
        let y = date.getFullYear();
        let format_date = '' + m + '/' + d + '/' + y
        return format_date
    }

    formatAddressURL = address => {
        if (address) {
            address = address.split(' ') 
            let URL = 'https://www.google.com/maps/place/' + address.join('+')
            return URL
        } else {
            return '#'
        }
    }

    toggleEditingField(fieldToEdit) {
        this.setState({editingField: fieldToEdit})
    }

    cancelEditingField() {
        this.setState({editingField: ''})
    }

    completeEditingField(fieldToEdit, fieldData) {
        var formData  = new FormData()
        formData.append(fieldToEdit, fieldData)
        this.props.dispatch(updateUserWithRedux(this.props.session.currentProfileID, formData))
        this.setState({editingField: ''})
    }

    addEditButton(memberTypeEditPermission, field) {

        if (this.state.editingField !== field && 
            (this.props.session.currentUserPermissions.includes(memberTypeEditPermission) === true ||
            (this.props.session.currentUserPermissions.includes('UpdateSelf') === true && 
              this.props.session.currentUserID === this.props.session.currentProfileID))) {
                return <IconButton color="secondary" aria-label="Edit" onClick={(e) => this.toggleEditingField(field)}>
                        <Icon>edit</Icon>
                       </IconButton>
        } 
    }

    renderContent() {
        if (this.props.session.currentProfileDataLoaded) {
            let memberTypeEditPermission = 'UpdateAnyUser' + this.props.session.currentProfileData.role.replace(/\s/g, '')
            return <Grid container style={{marginTop:10}}>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} align="center" >
                            {(this.state.editingField === 'avatar_path') ? 
                                <EditProfileImage
                                    cancelEditingField={this.cancelEditingField}
                                    completeEditingField={this.completeEditingField}
                                    fieldToEdit='fileObject'
                                    currentValue={this.props.session.currentProfileData.avatar_path} /> :
                                        
                                this.props.session.currentProfileData.avatar_path ? 
                                    <Avatar alt={this.props.session.currentProfileData.first_name} 
                                            src={'https://sleepy-plateau-42917.herokuapp.com' + 
                                                this.props.session.currentProfileData.avatar_path} 
                                            style={{width:200, height:200}}/> :
                                    <Avatar alt='No Avatar' src='/images/avatars/no_avatar.png'
                                            style={{width:200, height:200}} />
                                }
                            {this.addEditButton(memberTypeEditPermission, 'avatar_path')}
                                <Typography variant="title" style={{marginTop:15}}>
                                    {(this.state.editingField === 'role_id') ? 
                                        <EditSelectField
                                            cancelEditingField={this.cancelEditingField}
                                            completeEditingField={this.completeEditingField}
                                            fieldToEdit='role_id' 
                                            currentRole={this.props.session.currentProfileData.role}
                                            currentValue={this.props.session.currentProfileData.role_id} /> :
                                        <span>{this.props.session.currentProfileData.role}</span>
                                    }
                                    {this.addEditButton(memberTypeEditPermission, 'role_id')}
                                    <br/>
                                </Typography>
                                <Typography variant="title" style={{marginTop:15}}>
                                    {(this.state.editingField === 'date_of_birth') ? 
                                        <EditDateTextField
                                            cancelEditingField={this.cancelEditingField}
                                            completeEditingField={this.completeEditingField}
                                            fieldToEdit='date_of_birth' 
                                            currentValue={this.props.session.currentProfileData.date_of_birth} /> :
                                        <span>{this.formatBirthday(this.props.session.currentProfileData.date_of_birth)}</span>
                                    }
                                    {this.addEditButton(memberTypeEditPermission, 'date_of_birth')}
                                </Typography>
                        </Grid>
                    
                        <Grid item xl={8} lg={8} md={8} sm={6} xs={12} style={{textAlign: 'left'}}>
                            <Typography variant="display2" style={{textDecoration:'underline'}}>
                                {this.props.session.currentProfileData.first_name} {this.props.session.currentProfileData.last_name}
                            </Typography>
                            <Typography variant="title" style={{marginTop:15}}>
                                <span>Cell: </span>
                                {(this.state.editingField === 'cell_phone_number') ? 
                                    <EditTextField  
                                        cancelEditingField={this.cancelEditingField}
                                        completeEditingField={this.completeEditingField}
                                        fieldToEdit='cell_phone_number' 
                                        currentValue={this.props.session.currentProfileData.cell_phone_number} /> :
                                    <a href={`tel:${this.props.session.currentProfileData.cell_phone_number}`}>{this.props.session.currentProfileData.cell_phone_number}</a>
                                    
                                }
                                {this.addEditButton(memberTypeEditPermission, 'cell_phone_number')}
                                <br/>
                            </Typography>

                            <Typography variant="title" style={{marginTop:15}}>
                                <span>Home: </span>
                                {(this.state.editingField === 'home_phone_number') ? 
                                    <EditTextField  
                                        cancelEditingField={this.cancelEditingField}
                                        completeEditingField={this.completeEditingField}
                                        fieldToEdit='home_phone_number' 
                                        currentValue={this.props.session.currentProfileData.home_phone_number} /> :
                                    <a href={`tel:${this.props.session.currentProfileData.home_phone_number}`}>{this.props.session.currentProfileData.home_phone_number}</a>
                                    
                                }
                                {this.addEditButton(memberTypeEditPermission, 'home_phone_number')}
                                <br/>
                            </Typography>

                            <Typography variant="title" style={{marginTop:15}}>
                                <span>Email: </span>
                                {(this.state.editingField === 'email') ? 
                                    <EditTextField  
                                        cancelEditingField={this.cancelEditingField}
                                        completeEditingField={this.completeEditingField}
                                        fieldToEdit='email' 
                                        currentValue={this.props.session.currentProfileData.email} /> :
                                    <a href={`mailto:${this.props.session.currentProfileData.email}`}>{this.props.session.currentProfileData.email}</a>
                                    
                                }
                                {this.addEditButton(memberTypeEditPermission, 'email')}
                                <br/>
                            </Typography>

                            <Typography variant="title" style={{marginTop:15}}>
                                <span>Address: </span>
                                {(this.state.editingField === 'current_address') ? 
                                    <EditTextField  
                                        cancelEditingField={this.cancelEditingField}
                                        completeEditingField={this.completeEditingField}
                                        fieldToEdit='current_address' 
                                        currentValue={this.props.session.currentProfileData.current_address} /> :
                                    <a href={this.formatAddressURL(this.props.session.currentProfileData.current_address)} target="_blank">
                                        {this.props.session.currentProfileData.current_address}</a>
                                    
                                }
                                {this.addEditButton(memberTypeEditPermission, 'current_address')}
                                <br/>
                            </Typography>
                        </Grid>

                        <Grid item xl={2} lg={2} md={1}></Grid>
                        <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                            <Paper>
                                <Typography variant="title" style={{marginTop:15}}>
                                    <span>About: </span>
                                    {(this.state.editingField === 'bio') ? 
                                        <EditTextArea
                                            cancelEditingField={this.cancelEditingField}
                                            completeEditingField={this.completeEditingField}
                                            fieldToEdit='bio' 
                                            currentValue={this.props.session.currentProfileData.bio} /> :
                                        <span>{this.props.session.currentProfileData.bio}</span>
                                        
                                    }
                                    {this.addEditButton(memberTypeEditPermission, 'bio')}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xl={2} lg={2} md={1}></Grid>

                  </Grid>
        }
    }

    render(){
        return (
            <div>
                {this.renderContent(this.state.userLoaded)}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Profile)