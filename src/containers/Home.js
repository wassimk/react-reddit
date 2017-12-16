import React, { Component } from 'react';
import * as actionCreators from '../actions';
import formatDate from '../util/formatDate';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { Link } from 'react-router-dom';
import { Posts } from '../components';

class Home extends Component {
  componentWillMount = () => {
    this.props.fetchCategories();
    this.props.fetchPosts();
  };

  render() {
    return (
      <div>
        <div>
          {this.props.categories.map((category, index) => (
            <Link to={`${category.path}/posts`} key={index}>
              {category.name}
            </Link>
          ))}
        </div>
        <Posts posts={this.props.posts} />
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
