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
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
const getFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        console.log(`sim`, authenticationData);
        //se este token retornar o id da pessoa que segue o id do params pode liberar o perfil .. 
        //buscar na tabela join se o user do token tem o seguidor que ele procura o id
        if (!authenticationData) {
            res.statusCode = 422;
            throw "'token', ausente, ou inválido";
        }
        const feedData = new RecipeData_1.RecipeData();
        const getFeed = yield feedData.feedRecipes(authenticationData.id);
        console.log(getFeed);
        if (!getFeed) {
            throw new Error("nenhum usuario encontrado com esse id");
        }
        const foundFeed = getFeed;
        res.status(200).send(getFeed);
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});
exports.default = getFeed;
