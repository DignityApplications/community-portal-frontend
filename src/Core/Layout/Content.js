import React, { Component } from 'react'
import { Divider, Grid, Paper, Typography } from '@material-ui/core'
import Directory from '../../Modules/Directory'
import Events from '../../Modules/Events'

export default class Content extends Component
{
    constructor(props) {
        super(props);
    
        this.state = {
          holdin: true
        }
      }

    renderModule(module) {
        switch(module) {
            case 'Directory':
                return <Directory />
            case 'Events':
                return <Events />
            default:
                return  <Grid container>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                <Paper style={{padding: 25}}> 
                                    <Typography variant="display1">
                                        This is where Community content will go.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} 
                                  style={{marginTop: 25}}>
                                <Paper style={{padding: 25}}> 
                                    <Typography variant="title">Community Announcement 1 Stacked</Typography>
                                    <Divider style= {{margin: "25px 5px"}}/>
                                    <Typography variant="title">Community Announcement 2 Stacked</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}
                                  style={{marginTop: 25}}>
                                <Paper style={{padding: 25, marginRight: 10}}> 
                                    <Typography variant="display1"> Main Event Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}
                                  style={{marginTop: 25}}>
                                <Paper style={{padding: 25, marginLeft: 10}}> 
                                    <Typography variant="display1"> Main Other Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                    <Typography variant="headline"> Example Content </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                
        }
    }

    render() {
        return (
          <div>
            {this.renderModule(this.props.currentModule)}
          </div>
        );
      }

}


