import React, { Component } from 'react'
import { Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core'

class EditSelectField extends Component {

    state = { fieldData: this.props.currentValue }
    handleChange = name => event => { this.setState({ [name]: event.target.value }) }

    handleOpen = () => { this.setState({ open: true }) }
    handleClose = () => { this.setState({ open: false }) }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xl={8} lg={7} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <Select open={this.state.open} onClose={this.handleClose} onOpen={this.handleOpen}
                                    value={this.state.fieldData} onChange={this.handleChange("fieldData")}
                                    inputProps={{ name: this.props.fieldToEdit, id: this.state.fieldToEdit, }}>
                                <MenuItem value={1}>Member</MenuItem>
                                <MenuItem value={2}>Administrative Staff</MenuItem>
                                <MenuItem value={4}>Web Admin</MenuItem>
                                <MenuItem value={3}>Guest</MenuItem>
                            </Select>
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

export default EditSelectField