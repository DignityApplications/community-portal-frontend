import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoggedIn } from '../Components'
import { Button, Grid } from '@material-ui/core'

const mapStateToProps = (state) => {
    return { module: state.module, navigation: state.navigation }
}


class Navigation extends Component {

    render() {
        return (
            <Grid container style={{borderBottom: '1px solid #ccc'}} >
                {console.log('Navigation Reloaded')}
                <Grid item xs={10} align="left">
                    {
                        this.props.navigation[this.props.module.activeModule].map( (link) => {
                            //Eventually the code below will return a custom Navigation Component
                            return <Button key={link.title} >
                                          {link.title}</Button> 
                        })
                    }
                </Grid>
                <Grid item xs={2}>
                    <LoggedIn />
                </Grid>
            </Grid> 
        )
    }
} 

export default connect(mapStateToProps)(Navigation)