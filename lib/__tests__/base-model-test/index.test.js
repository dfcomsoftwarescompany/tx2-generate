"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = {
    createFilePath(path) {
        if (!fs.existsSync(path))
            fs.mkdirSync(path, { recursive: true });
    },
};
