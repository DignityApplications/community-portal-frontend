import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoggedIn } from '../Components'
import { Grid } from 'material-ui'

const mapStateToProps = (state) => {
    return { module: state.module }
}

//later need to get the info from somewhere
const links = {
    Home: [
        {title: 'Home Nav Link 1', href: '/home1'},
        {title: 'Home Nav Link 2', href: '/home2'},
        {title: 'Home Nav Link 3', href: '/home3'}
    ],
    Directory: [
        {title: 'Directory Nav Link 1', href: '/directory1'},
        {title: 'Directory Nav Link 2', href: '/directory2'},
        {title: 'Directory Nav Link 3', href: '/directory3'}
    ],
}

class Navigation extends Component {

    render() {
        return (
            <Grid container>
                {console.log('Navigation Reloaded')}
                <Grid item xs={10}>
                    {
                        links[this.props.module.activeModule].map( (link) => {
                            //Eventually the code below will return a custom Navigation Component
                            return <a href={link.href} key={link.title}>{link.title}</a> 
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