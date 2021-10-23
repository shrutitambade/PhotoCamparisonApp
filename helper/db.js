import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("photos.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS photos(id INTERGER PRIMARY KEY NOT NULL,url TEXT ,title TEXT );",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPhoto = (id,url, title) => {

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO photos (id,url,title) VALUES (?, ?, ?);",
        [id,url, title],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const fetchCompareList = (id,url, title) => {

    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM photos",
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };
  export const removeFromCompareList = (id) => {

    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM photos WHERE id=${id}`,
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };
