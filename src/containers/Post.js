import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Post extends Component {
  handleDelete = () => {
    this.props.actions.deletePost(this.props.post.id).then(() => {
      this.props.history.push(`/`);
    });
  };

  componentWillMount = () => {
    this.props.actions.fetchPost(this.props.match.params.id);
  };
  render() {
    if (!this.props.post) return null;
    return (
      <div>
        {this.props.post.title}
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.filter(post => post.id === props.match.params.id)[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
