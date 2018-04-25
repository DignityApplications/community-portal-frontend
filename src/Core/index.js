import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Content, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { SiteModal } from './Components'
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
                <SiteModal />
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12} 
                      style={{display:'flex', flexDirection: 'column', height:'100vh', 
                              backgroundSize:'cover', backgroundColor:'#FFAB91'}} >
                    <Toolbar updateCurrentModule={this.updateCurrentModule} />
                </Grid>
                <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
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
                            <Content
                                currentModule = {this.props.module.activeModule}
                            />
                        </Grid>
                        { displaySiedbar ? 
                            <Grid item sm={2}>
                                <Paper><Sidebar/></Paper>
                            </Grid> : null
                        }
                    </Grid>
                </Grid>
            </Grid>
      )
    }
}

export default connect(mapStateToProps)(Core)