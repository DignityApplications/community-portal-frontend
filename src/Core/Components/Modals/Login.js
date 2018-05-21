import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUserWithRedux } from '../../../ReduxStore/Actions'
import { Button, FormControl, Icon, Input, InputLabel, InputAdornment, TextField, Typography } from '@material-ui/core'

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
            <div>
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
                        <Button variant="raised" color={!this.props.session.loggedIn ? 'primary' : 'secondary'}
                                onClick={(e) => this.handleSubmit()}>
                            {!this.props.session.loggedIn ? 'Login' : 'Logout'}
                        </Button>
                    </Typography>
            </div>
        )
    }
}

export default connect(mapStateToProps)(LoggedIn)
