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
const gerador_validador_cpf_1 = require("gerador-validador-cpf");
const joi_1 = __importDefault(require("joi"));
exports.default = {
    CreateUserMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().min(2).required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(6).required(),
                cpf: joi_1.default.string().length(11).required(),
                saldo: joi_1.default.number().required(),
            });
            const options = {
                abortEarly: false,
            };
            const { error } = schema.validate(req.body, options);
            if (error) {
                res.status(400).json({
                    error: `Validation error: ${error.details
                        .map((error) => error.message)
                        .join(", ")}`,
                });
            }
            else if (!(0, gerador_validador_cpf_1.validate)(req.body.cpf)) {
                res.status(400).json({
                    error: "invalid cpf",
                });
            }
            else {
                next();
            }
        });
    },
};
