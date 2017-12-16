import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Posts } from '../components';

class Category extends Component {
  componentWillMount = () => {
    this.props.fetchPostsByCategory(this.props.match.params.category);
  };

  render() {
    return (
      <Posts posts={this.props.posts} deletePost={this.props.deletePost} />
    );
  }
}

const mapStateToProps = (state, componentState) => {
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps, actionCreators)(Category);
