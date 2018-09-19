import { ActionTypes } from '../constants';

function showOverlay(show: boolean) {
  return {
    type: ActionTypes.SHOW_OVERLAY,
    payload: {
      show
    }
  };
}

export {
  showOverlay
}
