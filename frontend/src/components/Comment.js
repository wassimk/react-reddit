import React, { Component } from 'react';
import Modal from 'react-modal';
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
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { post, actions, comment } = this.props;

    return (
      <div>
        {comment.body} - {comment.author} ({comment.voteScore})

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

        <button onClick={this.openModal}>Edit</button>
        <button onClick={() => this.props.actions.downVoteComment(comment.id)}>Down</button>
        <button onClick={() => this.props.actions.upVoteComment(comment.id)}>Up</button>
        <button onClick={() => this.props.actions.deleteComment(comment.id)}>Delete</button>
      </div>
    );
  }
}