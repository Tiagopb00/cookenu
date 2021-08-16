"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toModelRecipe = void 0;
exports.toModelRecipe = (input) => {
    return {
        id: input.id,
        id_user: input.id_user,
        name: input.name,
        author: input.author,
        title: input.title,
        description: input.description,
        createdAt: input.createdAt
    };
};
