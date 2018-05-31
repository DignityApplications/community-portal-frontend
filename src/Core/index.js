import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUserLoggedInWithRedux } from '../ReduxStore/Actions'
import { Content, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { SiteModal } from './Components'
import { Grid } from '@material-ui/core'
// import coreData from './config.json'

const mapStateToProps = (state) => {
    return { module: state.module }
}
  

class Core extends Component {

    componentWillMount () {
        this.props.dispatch(checkUserLoggedInWithRedux())
    }

    constructor(props) {
        super(props);
    
        this.state = {
            displayMenu: true,
            displaySiedbar: false,
        }
    }

    render() {
    
      const { displayMenu, displaySiedbar } = this.state 

      return (
            <Grid container>
                <SiteModal />
                <Grid item xl={1} lg={1} md={2} sm={2} xs={2} style={{backgroundColor:'rgb(36, 48, 94)', height:'100vh'}}>
                    <Toolbar updateCurrentModule={this.updateCurrentModule} />
                </Grid>
                <Grid item xl={11} lg={11} md={10} sm={10} xs={10} className="mainSiteContent" >
                    <Grid container>
                        <Grid item sm={12}>
                            <Navigation currentModule = {this.props.module.activeModule} />
                        </Grid>
                        { displayMenu ? 
                            <Grid item xl={2} lg={2} md={3} sm={3} style={{padding:0, height: '100vh'}}>
                                <Menu/>
                            </Grid> : null
                        }
                        <Grid item sm>
                            <Content
                                currentModule = {this.props.module.activeModule}
                            />
                        </Grid>
                        { displaySiedbar ? 
                            <Grid item sm={2}>
                                <Sidebar/>
                            </Grid> : null
                        }
                    </Grid>
                </Grid>
            </Grid>
      )
    }
}

export default connect(mapStateToProps)(Core)