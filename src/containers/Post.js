import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class Post extends Component {
  componentWillMount = () => {
    this.props.fetchPost(this.props.match.params.id);
  };
  render() {
    if (!this.props.post) return null;
    return <div>{this.props.post.title}</div>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.filter(post => post.id === props.match.params.id)[0]
  };
};

export default connect(mapStateToProps, actionCreators)(Post);
