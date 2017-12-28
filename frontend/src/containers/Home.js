import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Posts } from '../components';
import { bindActionCreators } from 'redux';
import { Nav, NavItem } from 'react-bootstrap';

class Home extends Component {
  componentWillMount = () => {
    this.props.actions.fetchCategories();
    this.props.actions.fetchPosts();
  };

  render() {
    return (
      <div>
        <div>
          <h4>Post Categories:</h4>
          <Nav bsStyle="pills" onSelect={this.handleSelect}>
            {this.props.categories.map((category, index) => (
              <NavItem eventKey={index} href={`${category.path}/posts`}>
                {category.name}
              </NavItem>
            ))}
          </Nav>
        </div>
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
