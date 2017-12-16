import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import serializeForm from '../util/serializeForm';
import { PostForm } from '../components';

class EditPost extends Component {
  form = {};
  componentWillMount = () => {
    this.props.fetchCategories();
    this.props.fetchPost(this.props.match.params.id);
  };

  handleSubmit = e => {
    e.preventDefault();
    const formValues = serializeForm(this.form);
    this.props.updatePost(formValues).then(post => {
      this.props.history.push(`/posts/${post.id}`);
    });
  };

  render() {
    return (
      <PostForm
        innerRef={this.form}
        post={this.props.post}
        categories={this.props.categories}
        handleSubmit={this.handleSubmit}
        isEditing={true}
        formAction="Update Post"
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    post: state.posts.filter(post => post.id === props.match.params.id)[0]
  };
};

export default connect(mapStateToProps, actionCreators)(EditPost);
