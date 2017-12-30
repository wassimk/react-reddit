import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Categories, CommentForm, Comment } from '../components';
import formatDate from '../util/formatDate';
import { bindActionCreators } from 'redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faComments from '@fortawesome/fontawesome-free-solid/faComments';

class Post extends Component {
  handleDelete = () => {
    this.props.actions.deletePost(this.props.post.id).then(() => {
      this.props.history.push(`/`);
    });
  };

  componentWillMount = () => {
    this.props.actions.fetchPost(this.props.match.params.id);
    this.props.actions.fetchCommentsByPostId(this.props.match.params.id);
    this.props.actions.fetchCategories();
  };

  render() {
    if (!this.props.categories) return null;
    if (!this.props.post) return null;
    if (!this.props.comments) return null;

    const { comments, actions, post, categories } = this.props;

    return (
      <div className="container">
        <Categories categories={categories} selected={post.category} />

        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div>
          Posted on <em>{formatDate(post.timestamp)}</em> by <strong>{post.author}</strong> with{' '}
          <strong>
            {post.voteScore} <FontAwesomeIcon icon={faThumbsUp} />
          </strong>{' '}
          and{' '}
          <strong>
            {post.commentCount} <FontAwesomeIcon icon={faComments} />
          </strong>.
          <br />
          <div>
            <ButtonGroup>
              <Button
                bsStyle="success"
                bsSize="xsmall"
                onClick={() => this.props.actions.upVotePost(post.id)}
              >
                + Vote
              </Button>
              <Button
                bsStyle="warning"
                bsSize="xsmall"
                onClick={() => this.props.actions.downVotePost(post.id)}
              >
                - Vote
              </Button>
              <Button bsStyle="info" bsSize="xsmall" href={`/posts/${post.id}/edit`}>
                Edit
              </Button>
              <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <h5>Comments</h5>
        {comments.map((comment, index) => (
          <div key={index}>
            <Comment post={post} actions={actions} comment={comment} />
          </div>
        ))}
        <div>
          <CommentForm post={post} actions={actions} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.filter(post => post.id === props.match.params.id)[0],
    comments: state.comments.filter(comment => comment.parentId === props.match.params.id),
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
