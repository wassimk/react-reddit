import React, { Component } from 'react';
import { Form, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import serialize from 'form-serialize';

export default class CommentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

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
    const formAction = isEditing ? 'Edit' : 'New';

    return (
      <div>
        <Col smOffset={2} sm={10}>
          <h3>{formAction} Comment</h3>
        </Col>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsText">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl
                name="author"
                type="text"
                placeholder="Author"
                defaultValue={comment ? comment.author : null}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Col componentClass={ControlLabel} sm={2}>
              Body
            </Col>
            <Col sm={10}>
              <FormControl
                name="body"
                placeholder="Body"
                componentClass="textarea"
                defaultValue={comment ? comment.body : null}
              />
            </Col>
          </FormGroup>
          <input name="parentId" type="hidden" defaultValue={post.id} />
          <input name="id" type="hidden" defaultValue={isEditing ? comment.id : ''} />

          <Col smOffset={2} sm={10}>
            <Button type="submit">{formAction}</Button>
          </Col>
        </Form>
      </div>
    );
  }
}
