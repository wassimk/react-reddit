import React, { Component } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import serializeForm from '../util/serializeForm';
class NewPost extends Component {
  componentWillMount = () => {
    this.props.fetchCategories();
  };

  handleSubmit = e => {
    e.preventDefault();
    const formValues = serializeForm(this.refs);
    this.props.createPost(formValues);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="title" name="title" />
        <textarea name="body" ref="body" />
        <input type="text" ref="author" name="author" />
        <select ref="category" name="category">
          {this.props.categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Post</button>
      </form>
    );
  }
}

const mapStateToProps = (state, componentState) => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps, actionCreators)(NewPost);
