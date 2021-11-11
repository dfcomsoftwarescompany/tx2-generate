import * as fs from 'fs';

export default {
  createFilePath(path: string) {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  },
};
