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
const UserData_1 = require("../data/UserData");
const toFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield new FollowerData_1.FollowerData().following(authenticationData.id, id_following);
        const result = yield new UserData_1.UserData().getUserById(id_following);
        const user_following = result.name;
        if (!result) {
            errorCode = 404;
            throw new Error("O perfil que você está tentando seguir não foi encontrado. Por favor, certifique-se de ter o correto'id'");
        }
        res.status(200).send(`Você está seguindo ${user_following}`);
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = toFollow;
