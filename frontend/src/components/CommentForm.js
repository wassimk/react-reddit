import React, { Component } from 'react';
import serialize from 'form-serialize';

export default class CommentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const form = e.target

    const formParams = serialize(form, { hash: true });

    if (this.props.isEditing === true) {
      this.props.actions.updateComment(formParams);
      this.props.closeModalHandler();
    } else {
      this.props.actions.createComment(formParams);
    }

    form.reset();
  };

  render() {
    const { isEditing, post, comment } = this.props;
    const formAction = (isEditing ? 'Edit' : 'New')

    return (
      <div>
        <h3>{formAction} Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <input name="parentId" type="hidden" defaultValue={post.id} />
          <input name="id" type="hidden" defaultValue={isEditing ? comment.id : ''} />
          Body: {<textarea name="body" defaultValue={comment ? comment.body : null} />}
          Author:{' '}
          {<input name="author" type="text" defaultValue={comment ? comment.author : null} />}
          <button type="submit">{formAction}</button>
        </form>
      </div>
    );
  }
}
