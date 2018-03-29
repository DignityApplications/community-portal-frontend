import React, { Component } from 'react'
import { AuthorizationProvider } from './Contexts/Providers'
import { Content, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { Grid, Paper } from 'material-ui'
// import coreData from './config.json'

export default class Core extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            currentModule: 'Home',
            disapbleMenu: true,
            displaySiedbar: true,
        }
        this.updateCurrentModule = this.updateCurrentModule.bind(this)
    }

    updateCurrentModule(value) { 
        this.setState({currentModule: value}) 
        value === 'Home' ? 
            this.setState({displaySiedbar: true}) :
            this.setState({displaySiedbar: false})
    }

    render() {
    
      const { currentModule, disapbleMenu, displaySiedbar } = this.state 

      return (
        <AuthorizationProvider>
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
                                        currentModule = {currentModule}
                                    />
                                </Paper>
                            </Grid>
                            { disapbleMenu ? 
                                <Grid item sm={2}>
                                    <Paper><Menu 
                                                currentModule = {currentModule}
                                            />
                                        </Paper>
                                </Grid> : null
                            }
                            <Grid item sm>
                                <Paper>
                                    <Content
                                        currentModule = {currentModule}
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
        </AuthorizationProvider>
      )
    }
}