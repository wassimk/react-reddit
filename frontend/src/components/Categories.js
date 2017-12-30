import React, { PureComponent } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

export default class Categories extends PureComponent {
  render() {
    if (!this.props.categories) return null;

    const { categories, selected } = this.props;

    return (
      <div>
        <h4>Post Categories:</h4>
        <Nav bsStyle="pills" activeKey={selected}>
          {categories.map(category => (
            <NavItem eventKey={category.name} key={category.name} href={`/${category.path}/posts`}>
              {category.name}
            </NavItem>
          ))}
        </Nav>
      </div>
    );
  }
}
