import React, { Component } from 'react'
import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { Button, FormControlLabel, FormControl, Grid, InputLabel, MenuItem, Select, Switch, 
         TextField, Typography } from '@material-ui/core'

import moment from 'moment'

class EditEventDateAndTime extends Component {

    state = { all_day: this.props.all_day, reservation_start: this.props.reservation_start, 
              reservation_end: this.props.reservation_end }

    handleChange = name => event => { this.setState({ [name]: event.target.value }) }
    handleCheck = name => event => { 
        console.log('hit')
        this.setState({ [name]: event.target.checked }) 
        console.log(this.state.all_day)    
    }
    handleStartDateTimeChange = (date) => { this.setState({ reservation_start: date }) }
    handleEndDateTimeChange = (date) => { this.setState({ reservation_end: date }) }

    renderSelectTime = () => {
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

    render() {
        return (
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormControlLabel
                        control={
                            <Switch checked={this.state.all_day} onChange={this.handleCheck('all_day')}
                            value="All Day" color="primary" />
                        } label="All Day Event" />
                    
                    {this.renderSelectTime()}
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{marginTop: 10}}>
                    <Button variant="raised" color="primary" 
                            onClick={(e) => this.props.completeEditingField(this.state.all_day, this.state.reservation_start, this.props.reservation_end)}>Update</Button>
                    <Button variant="raised" color="secondary" onClick={(e) => this.props.cancelEditingField()}>Cancel</Button>
                </Grid>
            </Grid>
        )
    }
}

export default EditEventDateAndTime