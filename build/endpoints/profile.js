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
Object.defineProperty(exports, "__esModule", { value: true });
const UserData_1 = require("../data/UserData");
const Authentication_1 = require("../services/Authentication");
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        const token = req.headers.authorization;
        if (!token) {
            errorCode = 401;
            throw new Error('You must be logged to access this information');
        }
        ;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        console.log(authenticationData.id);
        //   if (authenticationData.role !== "normal") {
        //     throw new Error("Only a normal user can access this funcionality");
        //   }
        const user = yield new UserData_1.UserData().getUserById(authenticationData.id);
        res.status(200).send({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    }
    catch (err) {
        res.status(errorCode).send({
            message: err.sqlMessage || err.message
        });
    }
});
exports.default = profile;
