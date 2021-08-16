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
const generateId_1 = require("../services/generateId");
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
const UserData_1 = require("../data/UserData");
//import moment from 'moment';
const postRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errorCode = 400;
    try {
        const { author, title, description } = req.body;
        const token = req.headers.authorization;
        if (!token) {
            errorCode = 401;
            throw new Error('You must be logged to create a recipe');
        }
        ;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        const user = yield new UserData_1.UserData().getUserById(authenticationData.id);
        if (authenticationData) {
            if (!user) {
                errorCode = 404;
                throw new Error('User not found');
            }
            ;
            const id = generateId_1.generateId();
            //const createdAt = moment( new Date()).format("YYYY/MM/DD")
            const recipe = new RecipeData_1.RecipeData();
            yield recipe.createRecipe(id, authenticationData.id, author, title, description);
            console.log(id, authenticationData.id, author, title, description);
            res.status(200).send({ message: 'receita adicionada com sucesso', id, author, title, description
            });
        }
    }
    catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
});
exports.default = postRecipe;
