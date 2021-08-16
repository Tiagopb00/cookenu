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
exports.FollowerData = void 0;
const connection_1 = __importDefault(require("./connection"));
const followerTable = "followTable";
const userTable = "userTable";
class FollowerData {
    constructor() {
        this.following = (id_user, id_following) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default
                .insert({ id_user, id_following })
                .into(followerTable);
        });
        this.showFollowing = (id_user, id_following) => __awaiter(this, void 0, void 0, function* () {
            //    const result = await connection
            //     .select("*")
            //     .from(followerTable)
            //     .where(id_user, id_following)
            const result = yield connection_1.default(followerTable)
                .select("userTable.id", "userTable.name")
                .where("followerTable.id_user", "=", id_user)
                .join("userTable", "id", "=", "followerTable.id_following");
            return result;
        });
        this.alreadyFollowing = (id_user, id_following) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(followerTable)
                .select("*")
                .where(id_following);
            console.log(result);
            return result;
        });
        this.unfollow = (id_user, id_following) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default
                .delete()
                .from(followerTable)
                .where(id_user, id_following);
        });
        this.checkFollowing = (id_user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(followerTable)
                .select("*")
                .where({ id_user });
            return result;
        });
    }
}
exports.FollowerData = FollowerData;
