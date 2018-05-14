import React, { Component } from 'react'
import { Button, Grid, Input } from 'material-ui'
import { FormControl } from 'material-ui/Form';

class EditProfileImage extends Component {

    state = { fieldData: this.props.currentValue, fileObject: '', fileUploadWarning: '' }
    handleChange = name => event => { this.setState({ [name]: event.target.value }) }

    handleFileUpload = file => { 
        var extension = file ? file.name.substr(file.name.length - 4) : ''
        if (extension == '.jpg') {
            this.setState({ fileName:file.name, fileObject:file, fileUploadWarning:'' }) 
        } else {
            this.setState({ fileUploadWarning: "Only '.jpg' files may be uploaded"})
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xl={8} lg={7} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <p style={{color:'red'}}>{this.state.fileUploadWarning}</p>
                            <Button variant='raised' color='default'>
                                <Input required type="file" onChange={(e) => this.handleFileUpload(e.target.files[0])} />
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item xl={4} lg={5} md={6} sm={12} xs={12}>
                        <Button variant="raised" color="primary" 
                                onClick={(e) => this.props.completeEditingField(this.props.fieldToEdit, this.state.fileObject)}>Update</Button>
                        <Button variant="raised" color="secondary" onClick={(e) => this.props.cancelEditingField()}>Cancel</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default EditProfileImage