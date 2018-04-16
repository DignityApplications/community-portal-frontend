import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar, Grid, Icon, Paper, Typography } from 'material-ui'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class Profile extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            userData: { },
            userLoaded: false
        }
    }

    componentWillMount() {
        const URL = "https://sleepy-plateau-42917.herokuapp.com/api/v1/users/" + this.props.session.currentUserProfileID
        return fetch(URL, { method: 'GET' } )
            .then( response => response.json() )
            .then( data => this.setState({userData: data.data[0], userLoaded: true}) )
            .catch(
                //NOTE: Need to add something like setState(error) to display if there is an error
            )
    }

    formatBirthday = birthday => {
        let date = new Date(birthday);
        let d = date.getDate() + 1
        let m = date.getMonth() + 1
        let y = date.getFullYear();
        let format_date = '' + m + '/' + d + '/' + y
        return format_date
    }

    formatAddressURL = address => {
        if (address) {
            address = address.split(' ') 
            let URL = 'https://www.google.com/maps/place/' + address.join('+')
            return URL
        } else {
            return '#'
        }
    }

    renderContent = userLoaded => {
        switch (userLoaded) {
            case true:
            return <Grid container style={{marginTop:10}}>
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                            { this.state.userData.avatar_path ? 
                                <Avatar alt={this.state.userData.first_name} src={this.state.userData.avatar_path} 
                                        style={{width:200, height:200, margin: 'auto'}}/> :
                                <Icon color="primary" style={{fontSize: 200, margin: 'auto'}}>account_circle</Icon> }
                                <Typography variant="title">
                                    {this.state.userData.role} <br/>
                                    {this.formatBirthday(this.state.userData.date_of_birth)}
                                </Typography>
                        </Grid>
                    
                        <Grid item xl={8} lg={8} md={8} sm={6} xs={12} style={{textAlign: 'left'}}>
                            <Typography variant="display2" style={{textDecoration:'underline'}}>
                                {this.state.userData.first_name} {this.state.userData.last_name}
                            </Typography>
                            <Typography variant="title" style={{marginTop:15}}>
                                Cell: <a href={`tel:${this.state.userData.cell_phone_number}`}>{this.state.userData.cell_phone_number}</a><br/>
                                Home: <a href={`tel:${this.state.userData.home_phone_number}`}>{this.state.userData.home_phone_number}</a><br/>
                                Email: <a href={`mailto:${this.state.userData.email}`}>{this.state.userData.email}</a><br/><br/>
                                
                                Address: <a href={this.formatAddressURL(this.state.userData.current_address)} target="_blank">
                                        {this.state.userData.current_address}</a>
                            </Typography>
                        </Grid>

                        <Grid item xl={2} lg={2} md={1}></Grid>
                        <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                            <Paper>
                                <Typography variant="title" style={{marginTop:15}}>
                                    About: {this.state.userData.bio}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xl={2} lg={2} md={1}></Grid>

                  </Grid>

            default:
                return <div></div>
        }
    }

    render(){
        return (
            <div>
                {this.renderContent(this.state.userLoaded)}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Profile)