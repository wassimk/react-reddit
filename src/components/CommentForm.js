import React, { Component } from 'react';
import serialize from 'form-serialize';

export default class CommentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const form = e.target

    const formParams = serialize(form, { hash: true });

    this.props.actions.createComment(formParams);

    form.reset();
  };

  render() {
    const { post, formAction, comment } = this.props;

    return (
      <div>
        <h3>New Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <input name="parentId" type="hidden" defaultValue={post.id} />
          Body: {<textarea name="body" defaultValue={comment ? comment.body : null} />}
          Author:{' '}
          {<input name="author" type="text" defaultValue={comment ? comment.author : null} />}
          <button type="submit">{formAction}</button>
        </form>
      </div>
    );
  }
}
