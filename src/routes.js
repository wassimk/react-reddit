import React from 'react';
import { Home, Posts, NewPost } from './containers';
import { Route, Link } from 'react-router-dom';

export default () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/posts/new">+ New Post</Link>
      </li>
    </ul>

    <hr />

    <Route exact path="/" component={Home} />
    <Route exact path="/posts" component={Posts} />
    <Route path="/posts/new" component={NewPost} />
  </div>
);
