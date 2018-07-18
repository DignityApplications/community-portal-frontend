import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateEventWithRedux, deleteEventWithRedux, addReservationtWithRedux, 
         updateReservationWithRedux, deleteReservationWithRedux,
         updateSnackBarContent, updateSnackBarOpen } from '../../../ReduxStore/Actions'
import { EditEventDateAndTime, EditTextArea, EditTextField } from '../FormEditElements'
import { Button, Divider, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, 
         Select, Typography } from '@material-ui/core'
import moment from 'moment'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class HelloWorld extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            editingField: '',
            selectingGuests: false,
        }

        this.cancelEditingField = this.cancelEditingField.bind(this)
        this.completeEditingField = this.completeEditingField.bind(this)
        this.completeEditingEventDateAndTimeField = this.completeEditingEventDateAndTimeField.bind(this)
    }

    toggleEditingField(fieldToEdit) { this.setState({editingField: fieldToEdit}) }
    cancelEditingField() { this.setState({editingField: ''}) }

    completeEditingField(fieldToEdit, fieldData) {
        var formData = { [fieldToEdit]: fieldData} 
        this.props.dispatch(updateEventWithRedux(this.props.session.currentEvent.id, formData))
        this.props.dispatch(updateSnackBarContent("Event Information Saved!"))
        this.props.dispatch(updateSnackBarOpen(true))
        this.setState({editingField: ''})
    }
    completeEditingEventDateAndTimeField(all_day, reservation_start, reservation_end) {
        console.log(all_day)
        var formData = { all_day, start: reservation_start, end: reservation_end} 
        console.log(formData)
        console.log(this.props.session.currentEvent.id)
        this.props.dispatch(updateEventWithRedux(this.props.session.currentEvent.id, formData))
        this.props.dispatch(updateSnackBarContent("Event Date and Time Saved!"))
        this.props.dispatch(updateSnackBarOpen(true))
        this.setState({editingField: ''})
    }

    addEditButton(field) {
        if (this.state.editingField !== field && 
            (this.props.session.currentUserPermissions.includes('UpdateEvents') === true) ) {
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
            this.props.dispatch(updateSnackBarContent("Event Removed"))
            this.props.dispatch(updateSnackBarOpen(true))
        }
    }

    renderUpdateGuests = (attendees, reservation_id) => {
        // We need to add 1 to the attendes to include the original member as well
        attendees = parseInt(attendees) + 1
        var formData = { attendees }
        this.props.dispatch(updateReservationWithRedux(reservation_id, formData))
        this.props.dispatch(updateSnackBarContent("Event Reservation Updated!"))
        this.props.dispatch(updateSnackBarOpen(true))
        this.setState({selectingGuests: false})
    }

    renderSelectGuests = (currentGuests, reservation_limit, alreadyAttending, reservation_id) => {
        //set the selectOptions based on current reservations
        var selectOptions = 0
        if (reservation_limit) {
            selectOptions = reservation_limit - alreadyAttending
            if ( selectOptions > 10 ) {
                selectOptions = 10 + 1
            }
        } else {
            selectOptions = 10 + 1
        }

        var testArray = [...Array(selectOptions).keys()]

        return (
            <FormControl fullWidth>
                <InputLabel htmlFor="guests">Guests</InputLabel>
                <Select
                    value={currentGuests.toString()}
                    onChange={(e) => this.renderUpdateGuests(e.target.value, reservation_id)}
                >
                    {testArray.map(i => {return <MenuItem key={i} value={i.toString()}>{i.toString()}</MenuItem> })}
                    
                </Select>
            </FormControl>
        )
    }

    renderReservationArea = () => {
        console.log(this.props.session.currentUserEventReservations)
        var alreadyReserved = false
        var currentReservation = ''
        var alreadyAttending = 0
        if (this.props.session.currentUserEventReservations) {
            alreadyReserved = this.props.session.currentUserEventReservations
                .filter(eventReservation => { 
                    alreadyAttending += eventReservation.attendees
                    return (eventReservation.event_id === this.props.session.currentEvent.id)
                }).length > 0
            if (alreadyReserved) {
                currentReservation =  this.props.session.currentUserEventReservations.filter(eventReservation => {return (eventReservation.event_id === this.props.session.currentEvent.id)})
            }
        }

        console.log('alreadyAttending: ' +  alreadyAttending)

        var allow_guests = this.props.session.currentEvent.allow_guests

        if(!alreadyReserved) {
            let user_id = this.props.session.currentUserID
            let event_id = this.props.session.currentEvent.id
            let attendees = 1

            let formData = {user_id, event_id, attendees}

            return (
                <div>
                    <Button variant="raised" color="primary" 
                            onClick={(e) => this.props.dispatch(addReservationtWithRedux(formData))}>
                        Attend Event
                    </Button>
                </div>
            )
        } else {
            if(allow_guests) {
                var guests = this.props.session.currentUserEventReservations.filter(eventReservation => {return (eventReservation.event_id === this.props.session.currentEvent.id)})
                guests = guests[0].attendees - 1
                console.log(guests)
                var reservation_limit = this.props.session.currentEvent.reservation_limit

                return (
                    <div>
                        <span>We can't wait to see you, and your

                            {/* onClick button below, render select with 1 - 10 as default
                                or 1 - reservation limit if under 10 */}
                            {this.state.selectingGuests === false ?
                            <Button style={{margin: '0 6px'}} variant="fab" color="primary" aria-label="guests" 
                                    onClick={(e) => this.setState({selectingGuests: true})}> 
                                {guests}
                            </Button> : 
                            this.renderSelectGuests(guests, reservation_limit, alreadyAttending, currentReservation[0].id)
                            }
                            guest(s)
                        </span>
                        <Button variant="raised" color="secondary"
                                onClick={(e) => {
                                                    this.props.dispatch(deleteReservationWithRedux(currentReservation[0].id))
                                                    this.setState({selectingGuests: false})
                                                } }>
                            Cancel Reservation
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Typography>We can't wait to see you there</Typography>
                        <Button variant="raised" color="secondary"
                                onClick={(e) => {
                                                    this.props.dispatch(deleteReservationWithRedux(currentReservation[0].id))
                                                    this.setState({selectingGuests: false})
                                                } }>
                            Cancel Reservation
                        </Button>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <Grid container align='center'>
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
                        {this.addEditButton('title')}
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
                            {this.addEditButton('description')}
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
                                {this.addEditButton('dateAndTime')}
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
                            {this.addEditButton('dateAndTime')}
                            </Typography>
                        } {this.props.session.currentEvent.all_day && 
                            <Typography align="left" style={{fontSize:'20px', margin: '10px 0'}} variant="title"><strong>Time: </strong>All Day Event
                            {this.addEditButton('dateAndTime')}
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
                            {this.addEditButton('location')}
                            <br/>
                        </Typography>
                    </div>
                    }

                    {this.props.session.currentEvent.reservable && this.renderReservationArea()}

                    {this.props.session.currentUserPermissions.includes('DeleteEvents') && this.renderDeleteButton()}
                    
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(HelloWorld)