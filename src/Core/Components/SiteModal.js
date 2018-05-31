import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateModalOpen } from '../../ReduxStore/Actions'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles';
import { Modal, Typography } from '@material-ui/core';

import{ DeleteUser, EventDetails, Login } from './Modals'

const mapStateToProps = (state) => {
  return { session: state.session }
}

function getModalStyle() {
  const top = 40
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

class SiteModal extends Component {

  handleClose = () => {
    this.props.dispatch(updateModalOpen(false))
  }

  renderModalComponent = component => {
    switch (component) {
      case 'deleteUser':
        return <DeleteUser />
      case 'eventDetails':
        return <EventDetails />
      case 'login':
        return <Login />
      default:
        return <Typography variant="title" id="modal-title">No Component Passed</Typography>
    }

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.session.modal.open}
          onClose={this.handleClose} >
          <div style={getModalStyle()} className={classes.paper}>
              {this.renderModalComponent(this.props.session.modal.component)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default compose(withStyles(styles),connect(mapStateToProps))(SiteModal)
