import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule } from '../../ReduxStore/Actions'
import { Button, Icon, Grid } from 'material-ui'


const mapStateToProps = (state) => {
    return { module: state.module }
}

class Toolbar extends Component {

    render() {
        return (
            <Grid container style={{marginTop: 10}}>
                <Grid item xl={12} lg={12} md={12} sm={4} xs={6} >
                    <Button variant="raised" size="large" 
                            onClick={(e) => this.props.dispatch(updateActiveModule("Home"))}>
                        <Icon color="primary" style={{fontSize: 100}}>home</Icon>
                    </Button>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={4} xs={6}>
                    <Button variant="raised" size="large" 
                            onClick={(e) => this.props.dispatch(updateActiveModule("Directory"))}>
                        <Icon color="primary" style={{fontSize: 100}}>account_circle</Icon>
                    </Button>
                </Grid>
            </Grid>
        )
    }

}

export default connect(mapStateToProps)(Toolbar)