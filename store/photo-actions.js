export const ADD_PHOTO = "ADD_PHOTO";
export const FETCH_PHOTO = "FETCH_PHOTO";
import { insertPhoto, fetchCompareList,removeFromCompareList } from "../helper/db";

export function addPhoto(id, url, title) {
  return async (dispatch) => {
    try {
      const dbResult = await insertPhoto(id, url, title);
      dispatch({
        type: ADD_PHOTO,
        photoData: { id: dbResult.insertId, url, title: title },
      });
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
}

export function loadPhotos(id, url, title) {
  return async (dispatch) => {
    try {
      const dbresult = await fetchCompareList();
      dispatch({
        type: FETCH_PHOTO,
        photoData: dbresult.rows._array,
      });
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
}

export function removePhoto(id) {
  return async (dispatch) => {
    try {
      const dbresult = await removeFromCompareList(id);
     
      dispatch({
        type: FETCH_PHOTO,
        photoData: dbresult.rows._array,
      });
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
}
