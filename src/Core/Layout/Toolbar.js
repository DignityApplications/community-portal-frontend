import React from 'react'
import { Button } from 'material-ui'

export default ({ updateCurrentModule }) =>
<div>
    <br/><br/>
    <Button variant="raised" size="large" color="primary" onClick={(e) => updateCurrentModule('Home')}>Home</Button>
    <br/><br/>
    <Button variant="raised" size="large" color="primary" onClick={(e) => updateCurrentModule('Directory')}>Directory</Button>
    <br/><br/>
</div>

