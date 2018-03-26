import React from 'react'
import { Button, Typography } from 'material-ui';
import { AuthorizationContext } from '../Contexts'

export default (props) =>

<AuthorizationContext.Consumer>
    {(context) => (
        <Typography varient='headline'>
            <Button variant="raised" 
                    color={!context.state.loggedIn ? 'primary' : 'secondary'}
                    onClick={() => context.toggleLoggedIn(context.state.loggedIn)}>
                {!context.state.loggedIn ? 'Login' : 'Logout'}
            </Button>
        </Typography>
    )}
</AuthorizationContext.Consumer>

