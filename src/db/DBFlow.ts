import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("wallpapers.db");

export const createTable = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Check if table exists
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='wallpapers';",
        [],
        (_, result) => {
          if (result.rows.length === 0) {
            // Table does not exist, create it
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS wallpapers (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT);",
              [],
              () => {
                console.log("Table created successfully");
                resolve();
              },
              (_, error) => {
                console.log("Error creating table: ", error);
                reject(error);
                return false;
              }
            );
          } else {
            // Table exists
            console.log("Table already exists");
            resolve();
          }
        },
        (_, error) => {
          console.log("Error checking table existence: ", error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const saveWallpaper = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO wallpapers (url) VALUES (?);",
        [url],
        () => {
          console.log("Wallpaper saved successfully");
          resolve();
        },
        (_, error) => {
          console.log("Error saving wallpaper: ", error);
          reject(error);
          return false;
        }
      );
    });
  });
};

interface Wallpaper {
  id: number;
  url: string;
}

export const getWallpapers = (): Promise<Wallpaper[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM wallpapers;",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("Error fetching wallpapers: ", error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteWallpaper = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM wallpapers WHERE id = ?;",
        [id],
        () => {
          console.log("Wallpaper deleted successfully");
          resolve();
        },
        (_, error) => {
          console.log("Error deleting wallpaper: ", error);
          reject(error);
          return false;
        }
      );
    });
  });
};
