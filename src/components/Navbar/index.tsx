import React, { Component } from 'react';
import { push } from 'react-router-redux';

  const buttons = [
    { name: 'portfolio', path: '/portfolio' },
    { name: 'search', path: '/search' },
    { name: 'company', path: '/company' }
  ];

class Navbar extends Component {

  constructor(props: any) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        {buttons.map((btn: any) =>
          <button onClick={((e: any) =>
            push(btn.path))}>{btn.name}
          </button>)}
      </div>
    );
  }
}

export { Navbar }
