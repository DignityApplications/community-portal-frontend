import React, { Component } from 'react'

class Home extends Component {
    renderEvents = (events) => {
        return events.map(event => <ul key={event.id}>
                <li>ID: {event.id}</li>
                <li>Name: {event.name}</li>
                <li>Description: {event.description}</li>
                <li>Begin: {event.start}</li>
                <li>End: {event.end}</li>
                <li>Location: {event.location}</li>
                <li>Creator: {event.creator}</li>
                <li>Reservable: {event.reservable}</li>
                <li>Limit: {event.reservation_limit}</li>
            </ul>)
    }
    render() {
        return (
            <div>
                <h1>Events Home</h1>
                {this.renderEvents(this.props.events)}
            </div>
        )
    }
}

export default Home