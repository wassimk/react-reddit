import React, { Component } from 'react';
import * as actionCreators from '../actions';
import formatDate from '../util/formatDate';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

class Home extends Component {
  state = {
    orderBy: 'timestamp'
  };
  componentWillMount = () => {
    this.props.fetchCategories();
    this.props.fetchPosts();
  };

  handleSort = e => {
    this.setState({ orderBy: e.target.value });
  };

  render() {
    return (
      <div>
        <select onChange={this.handleSort}>
          <option default value="timestamp">
            Date
          </option>
          <option value="voteScore">Score</option>
        </select>
        <div>
          {this.props.categories.map((category, index) => (
            <div key={index}>{category.name}</div>
          ))}
        </div>

        <div>
          {orderBy(this.props.posts, this.state.orderBy).map((post, index) => (
            <div key={index}>
              {post.title} on {formatDate(post.timestamp)} ({post.voteScore})
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, componentState) => {
  return {
    categories: state.categories,
    posts: state.posts
  };
};

export default connect(mapStateToProps, actionCreators)(Home);
