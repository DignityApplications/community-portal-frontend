import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEventWithRedux, deleteEventWithRedux } from '../../../ReduxStore/Actions'
import { EditDateTextField, EditProfileImage, EditSelectField, EditTextArea, EditTextField } from '../FormEditElements'
import { Divider, Grid, Icon, IconButton, Typography } from '@material-ui/core'
import moment from 'moment'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class HelloWorld extends Component {

    constructor(props) {
        super(props)

        this.state = { editingField: '' }

        this.cancelEditingField = this.cancelEditingField.bind(this)
        this.completeEditingField = this.completeEditingField.bind(this)
    }

    toggleEditingField(fieldToEdit) { this.setState({editingField: fieldToEdit}) }
    cancelEditingField() { this.setState({editingField: ''}) }

    completeEditingField(fieldToEdit, fieldData) {
        var formData = { [fieldToEdit]: fieldData} 
        this.props.dispatch(updateEventWithRedux(this.props.session.currentEvent.id, formData))
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

    handleDeleteEvent() {
        var result = window.confirm(`Are you sure you would like to delete event: ${this.props.session.currentEvent.title}`);
        if (result) {
            this.props.dispatch(deleteEventWithRedux(this.props.session.currentEvent.id))
        }
    }

    render() {
        let memberTypeEditPermission = 'UpdateEvents'
        return (
            <Grid container align='center'>
            {console.log(this.props.session.currentEvent)}
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    <Typography variant="display2" style={{margin:'10px 0',color:'rgb(36, 48, 94)'}}>
                        {(this.state.editingField === 'title') ? 
                            <EditTextField  
                                cancelEditingField={this.cancelEditingField}
                                completeEditingField={this.completeEditingField}
                                fieldToEdit='title' 
                                currentValue={this.props.session.currentEvent.title} /> :
                            this.props.session.currentEvent.title
                        }
                        {this.addEditButton(memberTypeEditPermission, 'title')}
                        <br/>
                    </Typography>
                    <Divider/>
                    <Typography component="p" align="left" style={{fontSize:'20px', margin: '10px 0'}}>{this.props.session.currentEvent.description}</Typography>
                    <Divider/>
                    <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}}><strong>Date: </strong>{moment(this.props.session.currentEvent.start).format('MM/DD/YYYY')}</Typography>
                    <Divider/>
                    <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}}><strong>Time: </strong>{moment(this.props.session.currentEvent.start).format('h:mm A')}
                    &nbsp;- {moment(this.props.session.currentEvent.end).format('h:mm A')}</Typography>
                    <Divider/>
                    <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}}><strong>Location: </strong>{this.props.session.currentEvent.location}</Typography>
                    
                    <IconButton color="secondary" aria-label="Delete" onClick={(e) => this.handleDeleteEvent()}><Icon>delete</Icon></IconButton>
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(HelloWorld)