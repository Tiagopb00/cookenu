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
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
const types_1 = require("../types");
const feedRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        console.log(`sim`, authenticationData);
        //se este token retornar o id da pessoa que segue o id do params pode liberar o perfil .. 
        //buscar na tabela join se o user do token tem o seguidor que ele procura o id
        if (!token) {
            res.statusCode = 422;
            throw "'token' é obrigatório";
        }
        if (authenticationData) {
            //pegar id do user_following do retorno da função que tem join
            const id_user = authenticationData.id;
            const user = new FollowerData_1.FollowerData();
            const following = yield user.checkFollowing(id_user);
            console.log(`pegar os ids dos following`, following[0].id_following);
            const recipe = new RecipeData_1.RecipeData();
            const getAll = yield recipe.getAll(following[0].id_following);
            const feedList = getAll.map(types_1.toModelRecipe);
            console.log(feedList);
            if (!getAll) {
                throw new Error("nenhuma receita cadastrada");
            }
            res.status(200).send(getAll);
        }
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = feedRecipes;
