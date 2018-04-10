import React from 'react'

import {TextField} from 'material-ui'

export default ({ textfield }) =>
<TextField required id="first_name" label="First Name" margin="normal"
           value={textfield} onChange={this.handleChange('first_name')}/>