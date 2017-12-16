import React, { Component } from 'react';

export default class PostForm extends Component {
  render() {
    const { handleSubmit, post, innerRef, categories, isEditing } = this.props;
    if (!post) return null;
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          defaultValue={post.id}
          ref={ref => (innerRef.id = ref)}
          name="id"
        />
        <input
          type="text"
          defaultValue={post.title}
          ref={ref => (innerRef.title = ref)}
          name="title"
        />
        <textarea
          name="body"
          defaultValue={post.body}
          ref={ref => (innerRef.body = ref)}
        />
        {!isEditing && (
          <input
            type="text"
            defaultValue={post.author}
            ref={ref => (innerRef.author = ref)}
            name="author"
          />
        )}
        <select
          defaultValue={post.category}
          ref={ref => (innerRef.category = ref)}
          name="category">
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">{this.props.formAction}</button>
      </form>
    );
  }
}
