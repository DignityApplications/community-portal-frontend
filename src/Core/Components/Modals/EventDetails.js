import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateEventWithRedux, deleteEventWithRedux } from '../../../ReduxStore/Actions'
import { EditEventDateAndTime, EditTextArea, EditTextField } from '../FormEditElements'
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
        this.completeEditingEventDateAndTimeField = this.completeEditingEventDateAndTimeField.bind(this)
    }

    toggleEditingField(fieldToEdit) { this.setState({editingField: fieldToEdit}) }
    cancelEditingField() { this.setState({editingField: ''}) }

    completeEditingField(fieldToEdit, fieldData) {
        var formData = { [fieldToEdit]: fieldData} 
        this.props.dispatch(updateEventWithRedux(this.props.session.currentEvent.id, formData))
        this.setState({editingField: ''})
    }
    completeEditingEventDateAndTimeField(all_day, reservation_start, reservation_end) {
        //Ask Elliot about why I have to set to not (!) below. Most likely a sytax issue
        all_day = !all_day
        var formData = { all_day: all_day, start: reservation_start, end: reservation_end} 
        console.log(formData)
        console.log(this.props.session.currentEvent.id)
        this.props.dispatch(updateEventWithRedux(this.props.session.currentEvent.id, formData))
        this.setState({editingField: ''})
    }

    addEditButton(memberTypeEditPermission, field) {

        if (this.state.editingField !== field && 
            (this.props.session.currentUserPermissions.includes(memberTypeEditPermission) === true ||
            (this.props.session.currentUserPermissions.includes('UpdateSelf') === true && 
              this.props.session.currentUserID === this.props.session.currentProfileID))) {
                return  <IconButton color="secondary" aria-label="Edit" onClick={(e) => this.toggleEditingField(field)}>
                            <Icon>edit</Icon>
                        </IconButton>
        } 
    }

    renderDeleteButton = () => {
        if (this.props.session.currentUserPermissions.includes('DeleteEvents') === true) {
            return (
                <IconButton color="secondary" aria-label="Delete" onClick={(e) => this.handleDeleteEvent()}>
                    <Icon>delete</Icon>
                </IconButton>
            )
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
                        {(this.state.editingField === 'title') ? <div>
                            Title:
                            <EditTextField  
                                cancelEditingField={this.cancelEditingField}
                                completeEditingField={this.completeEditingField}
                                fieldToEdit='title' 
                                currentValue={this.props.session.currentEvent.title} />
                                </div> :
                            this.props.session.currentEvent.title
                        }
                        {this.addEditButton(memberTypeEditPermission, 'title')}
                        <br/>
                    </Typography>
                    <Divider/>

                    {/* Render the Description for the Event */}
                    {this.props.session.currentEvent.description &&
                    <div>
                        <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}} variant="title">
                            {(this.state.editingField === 'description') ? <div>
                                        Description: 
                                        <EditTextArea 
                                            cancelEditingField={this.cancelEditingField}
                                            completeEditingField={this.completeEditingField}
                                            fieldToEdit='description' 
                                            currentValue={this.props.session.currentEvent.description} /> 
                                        </div>:
                                        this.props.session.currentEvent.description
                                    }
                            {this.addEditButton(memberTypeEditPermission, 'description')}
                            <br/>
                        </Typography>
                        <Divider/>
                    </div>
                    } 

                    {/* Render the Date of the Event*/}
                    {this.props.session.currentEvent.start &&
                    <div>
                        {(this.state.editingField === 'dateAndTime') ? <div>
                            Event Date and Time: 
                            <EditEventDateAndTime 
                                cancelEditingField={this.cancelEditingField}
                                completeEditingField={this.completeEditingEventDateAndTimeField}
                                all_day={this.props.session.currentEvent.all_day}
                                reservation_start={this.props.session.currentEvent.start}
                                reservation_end={this.props.session.currentEvent.end}
                                currentValue={this.props.session.currentEvent.description} /> 
                            </div>:
                            <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}}>
                                <strong>Date: </strong>
                                {moment(this.props.session.currentEvent.start).format('MM/DD/YYYY')}
                                {this.addEditButton(memberTypeEditPermission, 'dateAndTime')}
                            </Typography>
                        }                        
                        <Divider/>
                    </div>
                    }

                    {/* Render the Time of the Event*/}
                    {this.state.editingField !== 'dateAndTime' &&
                    <div>
                        {!this.props.session.currentEvent.all_day &&
                            <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}}><strong>Time: </strong>{moment(this.props.session.currentEvent.start).format('h:mm A')}
                            &nbsp;- {moment(this.props.session.currentEvent.end).format('h:mm A')}
                            {this.addEditButton(memberTypeEditPermission, 'dateAndTime')}
                            </Typography>
                        } {this.props.session.currentEvent.all_day && 
                            <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}} variant="title"><strong>Time: </strong>All Day Event
                            {this.addEditButton(memberTypeEditPermission, 'dateAndTime')}
                            </Typography>
                        }
                        <Divider/>
                    </div>
                    }

                    {/* Render the Location of the Event*/}
                    {this.props.session.currentEvent.location &&
                    <div>
                        <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}} variant="title"><strong>Location: </strong>
                            {(this.state.editingField === 'location') ? 
                                    <EditTextField  
                                        cancelEditingField={this.cancelEditingField}
                                        completeEditingField={this.completeEditingField}
                                        fieldToEdit='location' 
                                        currentValue={this.props.session.currentEvent.location} /> :
                                    this.props.session.currentEvent.location
                                }
                            {this.addEditButton(memberTypeEditPermission, 'location')}
                            <br/>
                        </Typography>
                    </div>
                    }

                    {this.renderDeleteButton()}
                    
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(HelloWorld)