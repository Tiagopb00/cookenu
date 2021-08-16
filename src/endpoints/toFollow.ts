import { FollowerData } from "../data/FollowerData";
import { Request, Response } from "express";
import { Authentication } from "../services/Authentication";
import { UserData } from "../data/UserData";

const toFollow = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const token = req.headers.authorization as string;
    const id_following = req.body.id

    if (!token) {
      errorCode = 401;
      throw new Error('Voce precisa esta logado para acessar essa informacao');
  };

    if (!id_following) {
      res.statusCode = 422
      throw "'id' de quem você deseja seguir é obrigatório"
    }

    const authenticationData = new Authentication().getData(token);


    if (id_following === authenticationData.id) {
      res.statusCode = 422
      throw "Você não pode seguir você mesmo!"
    }

    const user = await new FollowerData().following(authenticationData.id, id_following);
    const result = await new UserData().getUserById(id_following);
    const user_following = result.name

 

  if ( !result ) {
    errorCode = 404;
    throw new Error(
        "O perfil que você está tentando seguir não foi encontrado. Por favor, certifique-se de ter o correto'id'"
    );}

    res.status(200).send(`Você está seguindo ${user_following}`);


  } catch (err) {
    res.status(errorCode).send({message: err.sqlMessage || err.message });
  }
}
export default toFollow