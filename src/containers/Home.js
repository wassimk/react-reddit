import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class Home extends Component {
  componentWillMount = () => {
    this.props.fetchCategories();
    this.props.fetchPosts();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          {this.props.categories.map((category, index) => (
            <div key={index}>{category.name}</div>
          ))}
        </div>
        <div>
          {this.props.posts.map((post, index) => (
            <div key={index}>{post.title}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts
  };
};

export default connect(mapStateToProps, actionCreators)(Home);
