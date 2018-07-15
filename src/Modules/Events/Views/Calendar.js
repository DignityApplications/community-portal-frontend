import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateModalOpen_and_ModalComponent } from '../../../ReduxStore/Actions'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';
 
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


const mapStateToProps = (state) => {
  return { session: state.session, events: state.events}
}

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Events extends Component 
{

    renderOnSelect = (e) => {
      alert('hit' + JSON.stringify(e));
    }

    render () {
        return (
            <div>
                <BigCalendar
                    events={this.props.events.map(event => 
                        {
                            event.start = new Date(event.start)
                            event.end = new Date(event.end)
                            return event
                        }
                    )}
                    allDayAccessor='all_day'
                    views={allViews}
                    step={15}
                    timeslots={8}
                    onSelectSlot={(e) => console.log(e)}
                    onSelectEvent={(e) => this.props.dispatch(updateModalOpen_and_ModalComponent('eventDetails', e, this.props.session.currentUserID))}
                    //onSelectEvent={(e) => this.renderOnSelect(e)}
                    popup
                    showMultiDayTimes
                    defaultDate={new Date(2018, 6, 4)}
                    // defaultDate={new Date(2015, 3, 1)}

                    style={{background:'white', margin:25}}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps)(Events)