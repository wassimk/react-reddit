import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Categories, Posts } from '../components';
import { bindActionCreators } from 'redux';

class Home extends Component {
  componentWillMount = () => {
    this.props.actions.fetchCategories();
    this.props.actions.fetchPosts();
  };

  render() {
    return (
      <div className="container">
        <Categories categories={this.props.categories} />
        <Posts posts={this.props.posts} actions={this.props.actions} />
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
