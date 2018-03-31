import React, { Component } from 'react'
import { Typography } from 'material-ui'
import Directory from '../../Modules/Directory'

export default class Content extends Component
{
    constructor(props) {
        super(props);
    
        this.state = {
          holdin: true
        }
      }

    renderModule(module) {
        switch(module) {
            case 'Directory':
                return <Directory />
            case 'Events':
                return <Typography variant='headline'>Events.js</Typography>
            default:
                return <Typography variant='display2'>Default: Content.js</Typography>
                
        }
    }

    render() {
        return (
          <div>
            {this.renderModule(this.props.currentModule)}
          </div>
        );
      }

}


