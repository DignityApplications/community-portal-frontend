import React from 'react'
import { Avatar, Button, Icon } from 'material-ui'
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';

export default ({ avatar, firstName, lastName }) =>
<ListItem>
    <Avatar alt={firstName} src={`/images/${avatar}`} />
    <ListItemText primary={`${firstName} ${lastName}`} />
    <ListItemSecondaryAction>
        <Button color="primary"><Icon>edit_icon</Icon></Button>
        <Button color="secondary"><Icon>delete</Icon></Button>
    </ListItemSecondaryAction>
</ListItem>