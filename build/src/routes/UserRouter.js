"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserMiddle_1 = __importDefault(require("../middleware/UserMiddle"));
const router = (0, express_1.Router)();
router.post("/", UserMiddle_1.default.CreateUserMiddleware, UserController_1.default.CreateUser);
exports.default = router;
