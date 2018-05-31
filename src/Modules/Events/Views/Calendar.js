import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateModalOpen_and_ModalComponent } from '../../../ReduxStore/Actions'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';
 
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


const mapStateToProps = (state) => {
  return { session: state.session, menu: state.menu, users: state.users, view: state.view }
}

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const events = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },
  
    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },
  
    {
      id: 4,
      title: 'Some Event',
      start: new Date(2015, 3, 9, 0, 0, 0),
      end: new Date(2015, 3, 9, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 13),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 10, 30, 0, 0),
      end: new Date(2015, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 14, 0, 0, 0),
      end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2015, 3, 12, 17, 0, 0, 0),
      end: new Date(2015, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2015, 3, 12, 20, 0, 0, 0),
      end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2015, 3, 13, 7, 0, 0),
      end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2015, 3, 20, 19, 30, 0),
      end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
  ]


class Events extends Component 
{
    state = {
        convertedEvents: []
    }

    componentWillMount() {
        var tempCovertedEvents = this.props.events.map(event => 
            {
                event.start = new Date(event.start)
                event.end = new Date(event.end)
                event.allDay = event.all_day
                return event
            }
        )
        this.setState({convertedEvents: tempCovertedEvents})
    }

    renderOnSelect = (e) => {
      alert('hit' + JSON.stringify(e));
    }

    render () {
        var myEvents = [this.props.events[0]]
        return (
            <div>
                {console.log(this.state.convertedEvents)}
                <BigCalendar
                    // events={events}
                    events={this.state.convertedEvents}
                    views={allViews}
                    step={15}
                    timeslots={8}
                    onSelectEvent={(e) => this.props.dispatch(updateModalOpen_and_ModalComponent('eventDetails', e))}
                    //onSelectEvent={(e) => this.renderOnSelect(e)}
                    popup
                    showMultiDayTimes
                    defaultDate={new Date(2018, 4, 22)}
                    // defaultDate={new Date(2015, 3, 1)}

                    style={{background:'white', margin:25}}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps)(Events)