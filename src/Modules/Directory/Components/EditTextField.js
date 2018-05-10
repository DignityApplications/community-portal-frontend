import React, { Component } from 'react'
import { Button, Grid, TextField } from 'material-ui'
import { FormControl } from 'material-ui/Form';

class EditTextField extends Component {

    state = { fieldData: this.props.currentValue }
    handleChange = name => event => { this.setState({ [name]: event.target.value }) }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xl={8} lg={7} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <TextField required id={this.props.fieldToEdit} margin="normal"
                                value={this.state.fieldData} onChange={this.handleChange('fieldData')}/>
                        </FormControl>
                    </Grid>
                    <Grid item xl={4} lg={5} md={6} sm={12} xs={12}>
                        <Button variant="raised" color="primary" 
                                onClick={(e) => this.props.completeEditingField(this.props.fieldToEdit, this.state.fieldData)}>Update</Button>
                        <Button variant="raised" color="secondary" onClick={(e) => this.props.cancelEditingField()}>Cancel</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default EditTextField