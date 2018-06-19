import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEventWithRedux } from '../../../ReduxStore/Actions'

import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { Button, FormControlLabel, FormControl, Grid, InputLabel, MenuItem, Select, Switch, 
         TextField, Typography } from '@material-ui/core'
import moment from 'moment'

const mapStateToProps = (state) => {
    return { session: state.session }
}


class AddEvent extends Component {

    state = { title: "", description: "", reservation_start: null, reservation_end: null, location: "", 
              reservable: false, reservation_limit: "", all_day: false  }

    handleCheck = name => event => { this.setState({ [name]: event.target.checked }) }
    handleChange = name => event => { this.setState({ [name]: event.target.value }) }
    handleStartDateTimeChange = (date) => { this.setState({ reservation_start: date }) }
    handleEndDateTimeChange = (date) => { this.setState({ reservation_end: date }) }

    handleSubmit = () => { 
        var { title, description, reservation_start, reservation_end, location, reservable, reservation_limit, all_day } = this.state
        if (all_day) { 
            console.log('hit')
            reservation_start = moment(reservation_start).startOf('day')
            reservation_end = moment(reservation_start).endOf('day')
        }
        
        console.log(title)
        console.log(reservation_start)
        console.log(reservation_end)
        if (title && reservation_start && reservation_end && (reservation_end > reservation_start)) {
            if (!reservable || !reservation_limit) { reservation_limit = null }
            var formData = {
                creator: this.props.session.currentUserID,
                title: title,
                description: description,
                all_day: all_day,
                start: reservation_start,
                end: reservation_end,
                location: location,
                reservable: reservable,
                reservation_limit: reservation_limit
            }

            this.props.dispatch(addEventWithRedux(formData))

            this.setState({ title: '', description: '', reservation_start: null, reservation_end: null, location: "", 
                            reservable: false, reservation_limit: "", all_day: false})
        }
    }

    renderSelectTime = () => {
        //Yeah, FormControl F's up the DateTimePicker!?!?!? The Hell is that about?? 
        if (!this.state.all_day) {
            return (
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <DateTimePicker label="Event Start *" onError={console.log} disableOpenOnEnter
                                        value={this.state.reservation_start} onChange={this.handleStartDateTimeChange}/>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <DateTimePicker label="Event End *" onError={console.log} disableOpenOnEnter
                                        value={this.state.reservation_end} onChange={this.handleEndDateTimeChange}/>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <DatePicker label="Event Date" showTodayButton value={this.state.reservation_start} 
                                    onChange={this.handleStartDateTimeChange}/>
                    </Grid>
                </Grid>
            )
        }
    }

    renderReservationLimit = () => {
        if (this.state.reservable) {
            return (
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FormControl >
                            <TextField required id="reservation_limit" label="Reservation Limit" value={this.state.reservation_limit} 
                                    type="number" onChange={this.handleChange('reservation_limit')}/>
                        </FormControl>
                    </Grid>
                </Grid>
            )
        } 
    }

      
    render(){
        return (
            <div>
                <Grid container>
                    <Grid item xl={2} lg={2} md={1} sm={1}></Grid>
                    <Grid item xl={8} lg={8} md={11} sm={11} xs={12}>
                        <Typography variant="display2">
                            Add New Event
                        </Typography>
                        <FormControl fullWidth>
                            <TextField required id="title" label="Title" value={this.state.title} 
                                       onChange={this.handleChange('title')}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id={this.props.description} label="Description" multiline rows="4"
                                value={this.state.description} onChange={this.handleChange('description')}/>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Switch checked={this.state.all_day} onChange={this.handleCheck('all_day')}
                                value="All Day" color="primary" />
                            } label="All Day Event" />
                        
                        {this.renderSelectTime()}

                        <FormControlLabel
                            control={ <Switch checked={this.state.reservable} onChange={this.handleCheck('reservable')}
                                              value="Reservable" color="primary" /> 
                                    } label="Reservable" />
                        {this.renderReservationLimit()}

                        <FormControl fullWidth>
                            <TextField id="location" label="Location" value={this.state.location} 
                                       onChange={this.handleChange('location')}/>
                        </FormControl>

                        <Button type="submit" variant="raised" color="secondary" onClick={this.handleSubmit}
                                    style={{fontSize: 20, marginTop:15 }}>Add Event</Button>
                    </Grid>
                    <Grid item xl={2} lg={2} md={1} sm={1}></Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddEvent)