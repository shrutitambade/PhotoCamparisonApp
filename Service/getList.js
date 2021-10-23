import apiUrl from "../Contants/apiUrl"
export function getList() {
    return fetch(apiUrl.getPhotoListApi)
      .then(data => data.json())
  }