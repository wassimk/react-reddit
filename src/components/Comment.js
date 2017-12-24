import React, { PureComponent } from 'react';

export default class Comment extends PureComponent {
  render() {
    const comment = this.props.comment;

    return (
      <div>
        {comment.body} - {comment.author} ({comment.voteScore})

        <button onClick={() => this.props.actions.downVoteComment(comment.id)}>Down</button>
        <button onClick={() => this.props.actions.upVoteComment(comment.id)}>Up</button>
        <button onClick={() => this.props.actions.deleteComment(comment.id)}>Delete</button>
      </div>
    );
  }
}