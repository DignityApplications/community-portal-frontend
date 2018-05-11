import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUserLoggedInWithRedux } from '../ReduxStore/Actions'
import { Content, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { SiteModal } from './Components'
import { Grid } from 'material-ui'
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
                <Toolbar updateCurrentModule={this.updateCurrentModule} />
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className="mainSiteContent" >
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