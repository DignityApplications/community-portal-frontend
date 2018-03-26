import React from 'react'
import { AuthorizationProvider } from './Contexts/Providers'
import { Content, Menu, Navigation, Sidebar, Toolbar } from './Layout'
import { Grid, Paper } from 'material-ui'

export default props =>
<AuthorizationProvider>
    <Grid container>
        <Grid item xs={2}>
            <Paper><Toolbar/></Paper>
        </Grid>
        <Grid item xs={10}>
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper><Menu/></Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper><Navigation/></Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper><Content/></Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper><Sidebar/></Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
</AuthorizationProvider>