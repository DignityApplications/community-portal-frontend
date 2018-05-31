import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import moment from 'moment'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class HelloWorld extends Component {
    render() {
        return (
            <Grid container align='center'>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    <h1>{this.props.session.currentEvent.title}</h1>
                    <span><strong>When:</strong> {moment(this.props.session.currentEvent.start).format('MM/DD/YYYY')}</span>
                    <br/>
                    <span><strong>From:</strong> {moment(this.props.session.currentEvent.start).format('h:mm A')}</span>
                    &nbsp;&nbsp;
                    <span><strong>To:</strong> {moment(this.props.session.currentEvent.end).format('h:mm A')}</span>
                    <br/>
                    <span><strong>Where:</strong> {this.props.session.currentEvent.location}</span>
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(HelloWorld)