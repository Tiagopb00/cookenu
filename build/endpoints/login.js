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
const UserData_1 = require("../data/UserData");
const Authentication_1 = require("../services/Authentication");
const HashManager_1 = __importDefault(require("../services/HashManager"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        const { email, password } = req.body;
        const user = yield new UserData_1.UserData().getUserByEmail(email);
        if (!user) {
            errorCode = 404;
            throw new Error("User not found");
        }
        ;
        const hm = new HashManager_1.default();
        const compare = yield hm.compare(password, user.password);
        if (!compare) {
            throw new Error("Invalid password");
        }
        const token = new Authentication_1.Authentication().generateToken({
            id: user.id
        });
        res.status(200).send({
            token,
        });
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = login;
