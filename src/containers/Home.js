import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class Home extends Component {
  componentWillMount = () => {
    this.props.fetchCategories();
  };

  render() {
    return (
      <div>
        {this.props.categories.map((category, index) => (
          <div key={index}>{category.name}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps, actionCreators)(Home);
