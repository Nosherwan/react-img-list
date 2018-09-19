import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  showOverlay
} from '../../actions/ui';

const styles = require('./styles.css');

interface IOverlay {
  show: any
  selected: any
  showOverlay: any
}

class OverlayComponent extends Component<IOverlay, any> {

  constructor(props: any) {
    super(props)
  }

  render() {
    const { show, selected, showOverlay } = this.props;
    return (
      <div
        className={styles.overlay}
        style={{ display: (show ? 'flex' : 'none') }}>
        <div>
          <img src={selected.get('url')} />
          <button
            onClick={() => showOverlay(false)}
          >Close</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { search, ui } = state;

  return {
    selected: search.get('selected'),
    show: ui.get('showOverlay')
  };
};

const mapDispatchToProps = {
  showOverlay
};

const Overlay = connect(mapStateToProps, mapDispatchToProps)(OverlayComponent)

export { Overlay }
