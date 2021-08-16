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
const generateId_1 = require("../services/generateId");
const UserData_1 = require("../data/UserData");
const Authentication_1 = require("../services/Authentication");
const HashManager_1 = __importDefault(require("../services/HashManager"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password");
        }
        const { name, email, password } = req.body;
        let role = req.body.role;
        const id = generateId_1.generateId();
        const hm = new HashManager_1.default();
        const cryptedPassword = yield hm.hash(password);
        const sending = new UserData_1.UserData();
        yield sending.createUser(id, name, email, cryptedPassword);
        const token = new Authentication_1.Authentication().generateToken({
            id
        });
        res.status(200).send({
            token,
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});
exports.default = signup;
