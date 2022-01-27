"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use("/user", UserRouter_1.default);
app.listen(3000, () => {
    console.log("🔥 Hi, I'm running at http://localhost:3000/ 🔥");
});
