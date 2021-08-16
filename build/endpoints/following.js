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
const Authentication_1 = require("../services/Authentication");
const FollowerData_1 = require("../data/FollowerData");
const following = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        const id_user = authenticationData.id;
        const user = new FollowerData_1.FollowerData();
        const following = yield user.checkFollowing(id_user);
        console.log(`retorno`, following);
        res.status(200).send(following);
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = following;
