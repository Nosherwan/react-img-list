import { ActionTypes } from '../constants';

function addShares({ share }: { share: any }) {
  return {
    type: ActionTypes.SHARE_ADD,
    payLoad: share
  };
}

function removeShares({ share }: { share: any}) {
  return {
    type: ActionTypes.SHARE_REMOVE,
    payLoad: share
  };
}

export {
  addShares,
  removeShares
}
