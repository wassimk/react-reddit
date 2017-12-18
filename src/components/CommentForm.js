import React, { Component } from 'react';
import serializeForm from '../util/serializeForm';

export default class CommentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const formValues = {
      parentId: e.target.elements.parentId.value,
      body: e.target.elements.body.value,
      author: e.target.elements.author.value
    };

    this.props.actions.createComment(formValues);
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
