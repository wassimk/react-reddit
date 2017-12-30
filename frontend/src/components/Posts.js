import React, { PureComponent } from 'react';
import formatDate from '../util/formatDate';
import { orderBy } from 'lodash';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faComments from '@fortawesome/fontawesome-free-solid/faComments';

export default class Posts extends PureComponent {
  state = {
    orderBy: 'timestamp'
  };

  handleSort = e => {
    this.setState({ orderBy: e.target.value });
  };

  render() {
    if (this.props.posts.length === 0) return <div>No Posts for this Category</div>;

    return (
      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Sort by:</ControlLabel>
          <FormControl componentClass="select" default="timestamp" onChange={this.handleSort}>
            <option default value="timestamp">
              Date
            </option>
            <option value="voteScore">Score</option>
          </FormControl>
        </FormGroup>

        <div>
          {orderBy(this.props.posts, this.state.orderBy).map((post, index) => (
            <div key={index}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link> posted on{' '}
              <em>{formatDate(post.timestamp)}</em> by <strong>{post.author}</strong>{' '}
              <FontAwesomeIcon icon={faThumbsUp} /> {post.voteScore}{' '}
              <FontAwesomeIcon icon={faComments} /> {post.commentCount}
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
                  <Button
                    bsStyle="danger"
                    bsSize="xsmall"
                    onClick={() => this.props.actions.deletePost(post.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
