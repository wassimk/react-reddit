import React from 'react';
import { Home, Posts } from './containers';
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
    </ul>

    <hr />

    <Route exact path="/" component={Home} />
    <Route path="/posts" component={Posts} />
  </div>
);
