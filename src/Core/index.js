import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUserLoggedInWithRedux, updateSnackBarOpen } from '../ReduxStore/Actions'
import { Content, Login, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { SiteModal } from './Components'
import { Grid, Icon, Snackbar } from '@material-ui/core'
// import coreData from './config.json'

const mapStateToProps = (state) => {
    return { session: state.session, module: state.module }
}
  

class Core extends Component {

    componentWillMount = async () => {
       await this.props.dispatch(checkUserLoggedInWithRedux())
    }

    handleClose = () => {this.props.dispatch(updateSnackBarOpen(false))}

    render() {

      return (
          <div>
            {this.props.session.loggedIn ? <Grid container>
                    <SiteModal />
                    <Grid item xl={1} lg={1} md={2} sm={2} xs={2} className="mainSiteToolBar">
                        <Toolbar updateCurrentModule={this.updateCurrentModule} />
                    </Grid>

                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} className="mainSiteMenu">
                        <Menu/>
                    </Grid>

                    <Grid item xl={9} lg={9} md={8} sm={8} xs={8} className="mainSiteContent">
                        <Content currentModule = {this.props.module.activeModule} />
                    </Grid>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={this.props.session.snackBar.open}
                        autoHideDuration={5000}
                        onClose={(e) => this.handleClose()}
                        ContentProps={{ 'aria-describedby': 'message-id', }}
                        message={<span id="message-id">{this.props.session.snackBar.content}</span>}
                        action={[ <Icon onClick={(e) => this.handleClose()} > close </Icon>, ]} />
                </Grid> 
                : <Login />

            }
          </div>
      )
    }
}

export default connect(mapStateToProps)(Core)