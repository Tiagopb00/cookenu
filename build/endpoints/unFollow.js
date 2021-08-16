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
const FollowerData_1 = require("../data/FollowerData");
const Authentication_1 = require("../services/Authentication");
const unFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        const token = req.headers.authorization;
        const id_following = req.body.id;
        if (!token) {
            errorCode = 401;
            throw new Error('Voce precisa esta logado para acessar essa informacao');
        }
        ;
        if (!id_following) {
            res.statusCode = 422;
            throw "'id' de quem você deseja seguir é obrigatório";
        }
        const authenticationData = new Authentication_1.Authentication().getData(token);
        if (id_following === authenticationData.id) {
            res.statusCode = 422;
            throw "Você não pode seguir você mesmo!";
        }
        const unfollowId = yield new FollowerData_1.FollowerData().unfollow(authenticationData.id, id_following);
        res.status(200).send(`Você nao está seguindo `);
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = unFollow;
