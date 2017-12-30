import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Categories, Posts } from '../components';

class Category extends Component {
  componentWillMount = () => {
    this.props.actions.fetchPostsByCategory(this.props.match.params.category);
    this.props.actions.fetchCategories();
  };

  render() {
    if (!this.props.categories) return null;
    if (!this.props.posts) return null;

    return (
      <div>
        <Categories
          categories={this.props.categories}
          selected={this.props.match.params.category}
        />
        <Posts posts={this.props.posts} actions={this.props.actions} />
      </div>
    );
  }
}

const mapStateToProps = (state, componentState) => {
  return {
    posts: state.posts,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
