import { Request, Response } from "express";
import { RecipeData } from "../data/RecipeData";
import { Authentication } from "../services/Authentication";

const getRecipeById = async (req: Request, res: Response) => {
    let errorCode: number = 400;
    try {
        const id =  req.params.id
        const token = req.headers.authorization as string;

        if (!token) {
            errorCode = 401;
            throw new Error('You must be logged to access this information');
        };

        const authenticationData = new Authentication().getData(token);
        console.log(`sim`,authenticationData)

        if (!id||!token){
            res.statusCode = 422
            throw "'id' e 'token'são obrigatórios"
        }

        const recipeSearch = new RecipeData()
        const getRecipe = await recipeSearch.getRecipeById(id)
        console.log(getRecipe )
        
        if (!getRecipe ){
            throw new Error("nenhuma receita encontrado com esse id")
        }
        const found = getRecipe 
        res.status(200).send(getRecipe)

    } catch (err) {
        res.status(errorCode).send({message: err.sqlMessage || err.message});
      }

}
export default getRecipeById 
