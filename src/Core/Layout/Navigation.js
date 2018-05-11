import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoggedIn } from '../Components'
import { Button, Grid } from 'material-ui'

const mapStateToProps = (state) => {
    return { module: state.module, navigation: state.navigation }
}


class Navigation extends Component {

    render() {
        return (
            <Grid container style={{backgroundColor:'#24305E'}} >
                {console.log('Navigation Reloaded')}
                <Grid item xs={10} align="left">
                    {
                        this.props.navigation[this.props.module.activeModule].map( (link) => {
                            //Eventually the code below will return a custom Navigation Component
                            return <Button key={link.title} 
                                          style={{color:'#FFFFFF', fontFamily:'Rambla',letterSpacing:3,
                                                  fontWeight: 900, fontSize: '18px'}}>
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