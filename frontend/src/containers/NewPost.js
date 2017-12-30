import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { PostForm } from '../components';
import { bindActionCreators } from 'redux';
import serialize from 'form-serialize';

class NewPost extends Component {
  form = {};
  componentWillMount = () => {
    this.props.actions.fetchCategories();
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    const formParams = serialize(form, { hash: true });

    this.props.actions.createPost(formParams).then(post => {
      this.props.history.push(`/${post.category}/${post.id}`);
    });
  };

  render() {
    return (
      <PostForm
        post={this.props.post}
        categories={this.props.categories}
        handleSubmit={this.handleSubmit}
        formAction="Add"
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
