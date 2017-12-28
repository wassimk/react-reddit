import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import serializeForm from '../util/serializeForm';
import { PostForm } from '../components';
import { bindActionCreators } from 'redux';

class NewPost extends Component {
  form = {};
  componentWillMount = () => {
    this.props.actions.fetchCategories();
  };

  handleSubmit = e => {
    e.preventDefault();
    const formValues = serializeForm(this.form);
    this.props.actions.createPost(formValues).then(post => {
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
        formAction="Add Post"
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    post: {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
