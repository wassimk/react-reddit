import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { CommentForm, Comment } from '../components';
import formatDate from '../util/formatDate';
import { bindActionCreators } from 'redux';

class Post extends Component {
  handleDelete = () => {
    this.props.actions.deletePost(this.props.post.id).then(() => {
      this.props.history.push(`/`);
    });
  };

  componentWillMount = () => {
    this.props.actions.fetchPost(this.props.match.params.id);
    this.props.actions.fetchCommentsByPostId(this.props.match.params.id);
  };

  render() {
    if (!this.props.post) return null;
    if (!this.props.comments) return null;

    const { comments, actions, post } = this.props;

    return (
      <div>
        {post.title}
        {post.body}
        {post.author}
        {formatDate(post.timestamp)}

        (Votes: {post.voteScore})
              (Comments: {post.commentCount})

        <button onClick={this.handleDelete}>Delete</button>
        <div>
          <CommentForm
            post={post}
            actions={actions}
          />
        </div>
        {comments.map((comment, index) => (
          <Comment key={index} post={post} actions={actions} comment={comment} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.filter(post => post.id === props.match.params.id)[0],
    comments: state.comments.filter(comment => comment.parentId === props.match.params.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
