import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsWithRedux } from '../../ReduxStore/Actions'
import { AddEvent, Calandar, Home } from './Views'

const mapStateToProps = (state) => {
  return { session: state.session, events: state.events, menu: state.menu, view: state.view }
}


class Events extends Component  {

    componentWillMount() {
      this.props.dispatch(fetchEventsWithRedux())
    }

    renderView(view) {
        switch(view) {
            case 'Calendar':
                return <Calandar events={this.props.events}/>
            case 'AddEvent':
                return <AddEvent/>
            default:
                return <Home events={this.props.events} />
                
        }
    }

    render () {
        return (
            <div>
                {this.renderView(this.props.view.activeView[2].View)}
            </div>
        )
    }
}


export default connect(mapStateToProps)(Events)