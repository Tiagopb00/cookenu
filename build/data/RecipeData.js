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
exports.RecipeData = void 0;
const connection_1 = __importDefault(require("./connection"));
const recipeTable = "recipeTable";
const userTable = "userTable";
class RecipeData {
    constructor() {
        this.createRecipe = (id, user_id, author, title, description) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default
                .insert({
                id,
                user_id,
                author,
                title,
                description
            })
                .into(recipeTable);
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default
                .select("*")
                .from(recipeTable)
                .where({ id });
            return result[0];
        });
        this.getRecipeById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default
                .select("*")
                .from(recipeTable)
                .where({ id });
            return result[0];
        });
        this.feedRecipes = (id_user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(userTable)
                .select("recipeTable.id", "recipeTable.author", "userTable.name", "recipeTable.title", "recipeTable.decription")
                .where("userTable.id", "=", id_user)
                .join("recipeTable", "id_user", "=", "userTable.id");
            return result;
        });
        this.getAll = (id_following) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(userTable)
                .select("recipeTable.id", "recipeTable.id_user", "userTable.name", "recipeTable.author", "recipeTable.title", "recipeTable.description", "recipeTable.createdAt")
                .where("recipeTable.id_user", "=", id_following)
                .join("recipeTable", "id_user", "=", "userTable.id");
            return result;
        });
    }
}
exports.RecipeData = RecipeData;
