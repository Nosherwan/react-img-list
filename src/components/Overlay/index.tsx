import React, { Component } from 'react';
import { connect } from 'react-redux';

const styles = require('./styles.css');

interface INavbar {
  dispatch: any
}

class NavbarComponent extends Component<INavbar, any> {

  constructor(props: any) {
    super(props)
  }

  render() {

    return (
      <div className={styles.nav_container}>
      </div>
    );
  }
}

const Navbar = connect()(NavbarComponent)

export { Navbar }
