import React, { PureComponent } from 'react';
import formatDate from '../util/formatDate';
import { orderBy } from 'lodash';
import { Link } from 'react-router-dom';

export default class Posts extends PureComponent {
  state = {
    orderBy: 'timestamp'
  };

  handleSort = e => {
    this.setState({ orderBy: e.target.value });
  };

  handleDelete = id => {
    this.props.deletePost(id);
  };

  render() {
    if (this.props.posts.length === 0)
      return <div>No Posts for this Category</div>;
    return (
      <div>
        <select onChange={this.handleSort}>
          <option default value="timestamp">
            Date
          </option>
          <option value="voteScore">Score</option>
        </select>

        <div>
          {orderBy(this.props.posts, this.state.orderBy).map((post, index) => (
            <div key={index}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link> on{' '}
              {formatDate(post.timestamp)} ({post.voteScore})
              <Link to={`/posts/${post.id}/edit`}>Edit</Link>
              <button onClick={() => this.handleDelete(post.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
