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
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        const id = req.params.id;
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        console.log(`sim`, authenticationData);
        //se este token retornar o id da pessoa que segue o id do params pode liberar o perfil .. 
        //buscar na tabela join se o user do token tem o seguidor que ele procura o id
        if (!id || !token) {
            res.statusCode = 422;
            throw "'id' e 'token'são obrigatórios";
        }
        const userSearch = new UserData_1.UserData();
        const getUser = yield userSearch.getUserById(id);
        console.log(getUser);
        if (!getUser) {
            throw new Error("nenhum usuario encontrado com esse id");
        }
        const foundUser = getUser;
        res.status(200).send(getUser);
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = getProfileById;
