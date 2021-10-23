import { ADD_PHOTO, FETCH_PHOTO } from "./photo-actions";
import Photo from "../model/photos";

const initialState = {
  photos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTO:
      return {
        photos: action.photoData.map(
          (photo) => new Photo(photo.id.toString(), photo.url, photo.title)
        ),
      };
    case ADD_PHOTO:
      const newPhoto = new Photo(
        action.photoData.id,
        action.photoData.url,
        action.photoData.title
      );

      return {
        photos: state.photos.concat(newPhoto),
      };

    default:
      return state;
  }
};
