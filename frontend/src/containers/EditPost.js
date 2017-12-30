import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PostForm } from '../components';
import serialize from 'form-serialize';

class EditPost extends Component {
  form = {};
  componentWillMount = () => {
    this.props.actions.fetchCategories();
    this.props.actions.fetchPost(this.props.match.params.id);
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    const formParams = serialize(form, { hash: true });

    this.props.actions.updatePost(formParams).then(post => {
      this.props.history.push(`/${post.category}/${post.id}`);
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
        formAction="Update"
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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
