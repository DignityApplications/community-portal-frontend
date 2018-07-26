import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUserWithRedux } from '../../ReduxStore/Actions'
import { Button, Grid, FormControl, Icon, Input, InputLabel, InputAdornment, Paper, TextField, Typography } from '@material-ui/core'

const mapStateToProps = (state) => {
    return { session: state.session }
}

class LoggedIn extends Component {

    state = { email: '', password: '', showPassword: false }

    handleChange = name => event => { this.setState({ [name]: event.target.value }) }

    handleClickShowPassword = () => { this.setState({ showPassword: !this.state.showPassword }) } 

    handleSubmit = () => { 
        const { email, password } = this.state
        if (email && password) {

            const formData = { email, password } 
            this.props.dispatch(loginUserWithRedux(formData))
            this.setState({ email: '', password: '', showPassword: false }) 
        }
    }

    render() {
        return (
            <Grid container alignItems="center" 
                  style={{height: '100vh'}}>
                  <img src="https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F39517%2Frose-flower-blossom-bloom-39517.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26fit%3Dcrop%26h%3D627%26w%3D1200"
                       style={{ position: "absolute", width: "100%", height: "100vh", zIndex: "-1", opacity: ".6"}} />
                <Grid item xl={4} lg={4} md={3} sm={2} xs={1}></Grid>
                <Grid item xl={4} lg={4} md={6} sm={8} xs={10} >
                    <Paper elevation={4} style={{ padding: 25,}}>
                        <Typography variant="display2">
                            Login
                        </Typography>
                            <form>
                                <FormControl fullWidth>
                                    <TextField required id="email" label="Email" margin="normal"
                                            value={this.state.email} onChange={this.handleChange('email')}/>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="adornment-password">Password *</InputLabel>
                                    <Input 
                                        id="adornment-password" required
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password} onChange={this.handleChange('password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <Icon aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword} >
                                            {this.state.showPassword ? 'visibility_off' :  'visibility'} </Icon>
                                        </InputAdornment>
                                        } />
                                </FormControl>
                            </form> 
                        <Typography align='center' style={{marginTop:30}} >
                            <Button variant="raised" style={{color: "#FFF", textTransform:"capitalize", fontWeight: "bold", backgroundColor: "#FF8500" }}
                                    onClick={(e) => this.handleSubmit()}>
                                {!this.props.session.loggedIn ? 'Login' : 'Logout'}
                            </Button>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xl={4} lg={4} md={3} sm={2} xs={1}></Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(LoggedIn)
