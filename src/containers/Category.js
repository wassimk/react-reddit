import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Posts } from '../components';

class Category extends Component {
  componentWillMount = () => {
    this.props.actions.fetchPostsByCategory(this.props.match.params.category);
  };

  render() {
    return (
      <Posts
        posts={this.props.posts}
        deletePost={this.props.actions.deletePost}
      />
    );
  }
}

const mapStateToProps = (state, componentState) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
