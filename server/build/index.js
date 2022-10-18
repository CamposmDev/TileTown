"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const test_1 = __importDefault(require("./schemas/test"));
const app = (0, express_1.default)();
const port = process.env.PORT || '3000';
app.use(express_1.default.static(path_1.default.join(__dirname, '/public')));
app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello there!" });
});
app.listen(port, () => {
    (0, db_1.connect)();
    test_1.default.create({ "message": "Hello world!" });
    console.log(`Server started on port ${port}...`);
});
exports.default = app;
