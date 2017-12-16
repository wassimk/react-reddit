import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Posts } from '../components';
import { bindActionCreators } from 'redux';

class Home extends Component {
  componentWillMount = () => {
    this.props.actions.fetchCategories();
    this.props.actions.fetchPosts();
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
        <Posts
          posts={this.props.posts}
          deletePost={this.props.actions.deletePost}
        />
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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
