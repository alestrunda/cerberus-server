import fs from "fs";

const readDirFilesPromise = () =>
  new Promise((resolve, reject) => {
    fs.readdir(
      process.env.BACKGROUNDS_FOLDER,
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(
          files.filter(item => !item.isDirectory()).map(item => item.name)
        );
      }
    );
  });

export default {
  backgrounds: async () => {
    try {
      return await readDirFilesPromise();
    } catch (e) {
      return e;
    }
  },
  backgroundRandom: async () => {
    try {
      const results = await readDirFilesPromise();
      return results[Math.floor(Math.random() * results.length)];
    } catch (e) {
      return e;
    }
  }
};
