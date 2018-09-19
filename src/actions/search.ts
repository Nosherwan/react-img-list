import { ActionTypes } from '../constants';
import Api from '../api'

function fetchPhotos(count: number) {
  const calls = [];
  const newCount = count + 3;
  for (let i: number = count + 1; i <= newCount; i++) {
    calls.push(Api.getJSON(`photos/${i}`, { authorization: false }));
  }
  return Promise.all(calls).then((res: any) => {
    return { count: newCount, results: res };
  });
}

function getPhotos(count: number) {
  return {
    type: ActionTypes.PHOTO_FETCH,
    payload: fetchPhotos(count)
  };
}

function setPhoto(photo: any) {
  return {
    type: ActionTypes.SET_SELECTED_PHOTO,
    payload: {
      selected: photo
    }
  };
}

export {
  getPhotos,
  setPhoto
}
