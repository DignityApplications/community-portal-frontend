import React, { Fragment } from 'react'
import { List } from 'material-ui'
import { UserListItem } from '../Components'
import { Typography } from 'material-ui'

export default ({ users }) =>
<Fragment>
    <Typography variant="display2">
        Users
    </Typography>

    <List>
        {users.map(data => (
            <UserListItem key={data.id} id={data.id}
                    avatar={data.avatar} first_name={data.first_name} last_name={data.last_name} />
        ))}
    </List>
</Fragment>