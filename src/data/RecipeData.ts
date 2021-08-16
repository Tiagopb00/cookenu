import connection from './connection'
import { user, recipe } from '../types';

const recipeTable = "recipeTable";
const userTable = "userTable"

export class RecipeData {

  createRecipe = async (id: string, user_id: string, author: string, title: string, description: string): Promise<void> => {
  await connection
      .insert({
        id,
        user_id,
        author,
        title,
        description
      })
      .into(recipeTable);
  }


getUserById= async (id: string): Promise<user> => {
      const result = await connection
      .select("*")
      .from(recipeTable)
      .where({ id });

      return result[0];
  }


  getRecipeById= async (id: string): Promise<any> => {
    const result = await connection
    .select("*")
    .from(recipeTable)
    .where({ id });

    return result[0];
  }

  feedRecipes = async (id_user:string): Promise<any> => {
    const result = await connection(userTable)
    .select("recipeTable.id","recipeTable.author","userTable.name", "recipeTable.title","recipeTable.decription")
    .where("userTable.id", "=", id_user)
    .join("recipeTable","id_user","=", "userTable.id")

    return result
  }

  getAll = async(id_following:string): Promise<recipe[]> => {
    const result = await connection(userTable)
    .select("recipeTable.id","recipeTable.id_user","userTable.name", "recipeTable.author",
     "recipeTable.title","recipeTable.description","recipeTable.createdAt")
    .where("recipeTable.id_user", "=", id_following)
    .join("recipeTable","id_user","=", "userTable.id")
  
    return result
  }
}