import React, { Fragment } from 'react'
import { List } from 'material-ui'
import { UserListItem } from '../Components'
import { Typography } from 'material-ui'

export default ({ users })=>
<Fragment>
    <Typography variant="display2">
        Users
    </Typography>

    <List>
        {users.map(data => (
            <UserListItem key={data.firstName} 
                            avatar={data.avatar} firstName={data.firstName} lastName={data.lastName} />
        ))}
    </List>
</Fragment>