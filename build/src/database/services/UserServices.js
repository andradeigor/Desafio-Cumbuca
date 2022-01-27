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
const index_1 = require("../../index");
const bcrypt_1 = __importDefault(require("../../lib/bcrypt"));
const jtw_1 = __importDefault(require("../../lib/jtw"));
exports.default = {
    CreateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasUserByEmail = yield index_1.prisma.user.findUnique({
                where: { email: data.email },
            });
            const hasUserByCpf = yield index_1.prisma.user.findUnique({
                where: { cpf: data.cpf },
            });
            return hasUserByEmail || hasUserByCpf
                ? null
                : this.CreateUserWithBcrypt(data);
        });
    },
    CreateUserWithBcrypt(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.email = data.email.toLowerCase();
            const hashedPassword = yield bcrypt_1.default.encrypt(data.password);
            const newUser = yield index_1.prisma.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            });
            const userToken = yield jtw_1.default.CreateToken(newUser.id);
            const TokenData = {
                token: userToken,
                userId: newUser.id,
            };
            const UserTokenInDb = yield index_1.prisma.token.create({ data: TokenData });
            newUser.password = "";
            return Object.assign(Object.assign({}, newUser), { token: userToken });
        });
    },
};
