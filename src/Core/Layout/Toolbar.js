import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule } from '../../ReduxStore/Actions'
import { Button } from 'material-ui'


const mapStateToProps = (state) => {
    return { module: state.module }
}

class Toolbar extends Component {

    render() {
        return (
            <div>
                <br/><br/>
                <Button variant="raised" size="large" color="primary" 
                    onClick={(e) => this.props.dispatch(updateActiveModule("Home"))}>Home</Button>
                <br/><br/>
                <Button variant="raised" size="large" color="primary" 
                    onClick={(e) => this.props.dispatch(updateActiveModule("Directory"))}>Directory</Button>
                <br/><br/>
            </div>
        )
    }

}

export default connect(mapStateToProps)(Toolbar)