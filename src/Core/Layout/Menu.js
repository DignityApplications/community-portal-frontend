import React from 'react'
import { LoggedIn } from '../Components'
import { Grid, Typography } from 'material-ui'

export default props =>
<Grid container>
    <Grid item xs={10}>
    <Typography varient='headline'>
      Menu for selected Component
    </Typography>
    </Grid>
    <Grid item xs={2}>
        <LoggedIn />
    </Grid>
</Grid>

