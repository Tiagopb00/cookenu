import { Request, Response } from "express";
import { generateId } from "../services/generateId";
import {RecipeData} from "../data/RecipeData";
import { Authentication } from "../services/Authentication";
import { UserData } from "../data/UserData";
//import moment from 'moment';

const postRecipe = async (req: Request, res: Response) => {
  let errorCode: number = 400;
    try {

     const {author, title, description } = req.body

     const token = req.headers.authorization as string;
     
     if (!token) {
      errorCode = 401;
      throw new Error('You must be logged to create a recipe');
  };

     const authenticationData = new Authentication().getData(token);

     const user = await new UserData().getUserById(authenticationData.id);
     if (authenticationData){

      if ( !user ) {
        errorCode = 404;
        throw new Error('User not found');
    };

     const id  =   generateId();
     //const createdAt = moment( new Date()).format("YYYY/MM/DD")

     const recipe = new RecipeData()
     await recipe.createRecipe(id, authenticationData.id, author, title, description)
     console.log( id, authenticationData.id, author, title, description)

      res.status(200).send({ message: 'receita adicionada com sucesso', id, author, title, description
      });
    }
    } catch (err) {
      res.status(errorCode).send({message: err.sqlMessage || err.message });
    }
  }
  export default postRecipe 