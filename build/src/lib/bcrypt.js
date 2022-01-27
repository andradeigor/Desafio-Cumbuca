"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = {
    encrypt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            return hashedPassword;
        });
    },
    decript(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = bcrypt_1.default.compare(password, hashedPassword);
            return login;
        });
    },
};
