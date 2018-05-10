import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateActiveModule } from '../../ReduxStore/Actions'
import { Button, Divider, Icon, Grid, Typography } from 'material-ui'


const mapStateToProps = (state) => {
    return { module: state.module, session: state.session }
}

class Toolbar extends Component {

    render() {
        return (
            <Grid container style={{marginTop: 10}}>
                <Grid item xl={12} lg={12} md={12} sm={4} xs={6} >
                    <Typography variant='title' style={{color:"#ff6600"}}>
                        <Icon style={{fontSize: 50, marginBottom:-10, paddingRight:20}}>supervisor_account</Icon>
                        Community
                    </Typography>
                    <Divider component="hr" style={{marginTop:10, height:2, backgroundColor:'white'}} />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={4} xs={6} >
                    <Button variant="raised" size="large" 
                            onClick={(e) => this.props.dispatch(updateActiveModule("Home"))}>
                        <Icon style={{fontSize: 100, color: "#ff6600"}}>home</Icon>
                    </Button>
                </Grid>
                {this.props.session.loggedIn ? 
                    <Grid item xl={12} lg={12} md={12} sm={4} xs={6}>
                        <Button variant="raised" size="large" 
                                onClick={(e) => this.props.dispatch(updateActiveModule("Directory"))}>
                            <Icon style={{fontSize: 100, color: "#ff6600"}}>account_circle</Icon>
                        </Button>
                    </Grid> : 
                null}
            </Grid>
        )
    }

}

export default connect(mapStateToProps)(Toolbar)