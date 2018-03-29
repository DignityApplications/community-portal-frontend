import React from 'react'
import { MenuItem, MenuList } from 'material-ui/Menu'

//later need to get the info from somewhere
const links = {
    Home: [
        {title: 'Home Menu Link 1', href: '/home1'},
        {title: 'Home Menu Link 2', href: '/home2'},
        {title: 'Home Menu Link 3', href: '/home3'}
    ],
    Directory: [
        {title: 'Directory Menu Link 1', href: '/directory1'},
        {title: 'Directory Menu Link 2', href: '/directory2'},
        {title: 'Directory Menu Link 3', href: '/directory3'}
    ],
}

export default ({ currentModule }) =>
<MenuList>
    {
        links[currentModule].map( (link) => {
            return <MenuItem key={link.title}>{link.title}</MenuItem> 
        })
    }
</MenuList>

