import React from 'react';
import { Home, Post, EditPost, NewPost, Category } from './containers';
import { Route, Link, Switch } from 'react-router-dom';

export default () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts/new">+ New Post</Link>
      </li>
    </ul>

    <hr />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:category/posts" component={Category} />
      <Route path="/posts/new" component={NewPost} />
      <Route exact path="/posts/:id" component={Post} />
      <Route path="/posts/:id/edit" component={EditPost} />
    </Switch>
  </div>
);
