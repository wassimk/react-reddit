import React, { Component } from 'react';
import { Form, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class PostForm extends Component {
  render() {
    const { handleSubmit, post, isEditing, categories } = this.props;

    if (!post) return null;

    return (
      <div>
        <Col smOffset={2} sm={10}>
          <h3>{this.props.formAction} Post</h3>
        </Col>
        <Form horizontal onSubmit={handleSubmit}>
          <FormGroup controlId="formControlsText">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
            <Col sm={10}>
              <FormControl
                name="title"
                type="text"
                placeholder="Title"
                defaultValue={post ? post.title : null}
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
                defaultValue={post ? post.body : null}
              />
            </Col>
          </FormGroup>
          {!isEditing && (
            <FormGroup controlId="formControlsText">
              <Col componentClass={ControlLabel} sm={2}>
                Author
              </Col>
              <Col sm={10}>
                <FormControl
                  name="author"
                  type="text"
                  placeholder="Author"
                  defaultValue={post ? post.author : null}
                />
              </Col>
            </FormGroup>
          )}
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Category
            </Col>
            <Col sm={10}>
              <FormControl name="category" defaultValue={post.category} componentClass="select">
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="submit">
              {this.props.formAction}
            </Button>
          </Col>
          <input type="hidden" defaultValue={post.id} name="id" />
        </Form>
      </div>
    );
  }
}
