import { ActionTypes } from '../constants';

function addShares({ share }: { share: any }) {
  return {
    type: ActionTypes.SHARE_ADD,
    payload: share
  };
}

function removeShares({ share }: { share: any}) {
  return {
    type: ActionTypes.SHARE_REMOVE,
    payload: share
  };
}

export {
  addShares,
  removeShares
}
