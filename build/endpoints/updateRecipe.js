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
exports.updateRecipe = void 0;
const Authentication_1 = require("../services/Authentication");
const getRecipeById_1 = __importDefault(require("./getRecipeById"));
const getRecipeById_2 = __importDefault(require("./getRecipeById"));
//import moment from 'moment';
exports.updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.title) {
            res.statusCode = 422;
            throw new Error("Título não preenchido");
        }
        if (!req.body.description) {
            res.statusCode = 422;
            throw new Error("Descrição não preenchida");
        }
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        const user_id = yield getRecipeById_2.default();
        const recipe = yield getRecipeById_1.default(req.params.id);
        if (recipe.user_id !== user_id.id) {
            res.statusCode = 422;
            throw new Error("Não é permitido alterar a receita de outro usuário");
        }
        yield exports.updateRecipe(req.params.id, req.body.title, req.body.description);
        res.status(200).send("Receita atualizada com sucesso");
    }
    catch (error) {
        res.send(error.message || error.sqlMessage);
    }
});
