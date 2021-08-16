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
exports.UserData = void 0;
const connection_1 = __importDefault(require("./connection"));
const userTable = "userTable";
class UserData {
    constructor() {
        this.createUser = (id, name, email, password) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default
                .insert({
                id,
                name,
                email,
                password
            })
                .into(userTable);
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default
                .select("*")
                .from(userTable)
                .where({ email });
            return result[0];
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default
                .select("id", "name", "email")
                .from(userTable)
                .where({ id });
            return result[0];
        });
    }
}
exports.UserData = UserData;
