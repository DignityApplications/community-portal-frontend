import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Content, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { Grid, Paper } from 'material-ui'
// import coreData from './config.json'

const mapStateToProps = (state) => {
    return { module: state.module }
}
  

class Core extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            displayMenu: true,
            displaySiedbar: true,
        }
    }

    render() {
    
      const { displayMenu, displaySiedbar } = this.state 

      return (
            <Grid container>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Paper><Toolbar updateCurrentModule={this.updateCurrentModule} /></Paper>
                </Grid>
                <Grid item xl={2} lg={10} md={10} sm={12} xs={12}>
                    <Paper>
                        <Grid container>
                            <Grid item sm={12}>
                                <Paper>
                                    <Navigation
                                        currentModule = {this.props.module.activeModule}
                                    />
                                </Paper>
                            </Grid>
                            { displayMenu ? 
                                <Grid item sm={2}>
                                    <Paper><Menu/></Paper>
                                </Grid> : null
                            }
                            <Grid item sm>
                                <Paper>
                                    <Content
                                        currentModule = {this.props.module.activeModule}
                                    />
                                </Paper> 
                            </Grid>
                            { displaySiedbar ? 
                                <Grid item sm={2}>
                                    <Paper><Sidebar/></Paper>
                                </Grid> : null
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
      )
    }
}

export default connect(mapStateToProps)(Core)