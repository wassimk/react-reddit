import React, { Component } from 'react';
import Modal from 'react-modal';
import { ButtonGroup, Button } from 'react-bootstrap';
import { CommentForm } from './';

export default class Comment extends Component {
  state = {
    modalIsOpen: false
  };

  customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { post, actions, comment } = this.props;

    return (
      <div key={comment.id}>
        {comment.body} - {comment.author} ({comment.voteScore})
        <br />
        <ButtonGroup>
          <Button
            bsStyle="success"
            bsSize="xsmall"
            onClick={() => this.props.actions.upVoteComment(comment.id)}
          >
            + Vote
          </Button>
          <Button
            bsStyle="warning"
            bsSize="xsmall"
            onClick={() => this.props.actions.downVoteComment(comment.id)}
          >
            - Vote
          </Button>
          <Button bsStyle="info" bsSize="xsmall" onClick={this.openModal}>
            Edit
          </Button>
          <Button
            bsStyle="danger"
            bsSize="xsmall"
            onClick={() => this.props.actions.deleteComment(comment.id)}
          >
            Delete
          </Button>
        </ButtonGroup>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={this.customModalStyles}
          contentLabel="Edit Comment"
        >
          <button onClick={this.closeModal}>close</button>
          <CommentForm
            closeModalHandler={this.closeModal}
            post={post}
            actions={actions}
            comment={comment}
            isEditing={true}
          />
        </Modal>
      </div>
    );
  }
}
