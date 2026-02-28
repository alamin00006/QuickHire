"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const index_1 = __importDefault(require("./app/routes/index"));
const globalErrorHandler_1 = __importDefault(require("./errors/globalErrorHandler"));
const dbConnect_1 = require("./helpers/dbConnect");
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// connect DB
(0, dbConnect_1.databaseConnect)();
// routes
app.get('/', (req, res) => res.send('API OK'));
app.use('/api/v1', index_1.default);
// error
app.use(globalErrorHandler_1.default);
exports.default = (0, serverless_http_1.default)(app);
