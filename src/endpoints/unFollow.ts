import { FollowerData } from "../data/FollowerData";
import { Request, Response } from "express";
import { Authentication } from "../services/Authentication";
import { UserData } from "../data/UserData";

const unfollow = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const id_following = req.body.id

    if (!id_following) {
      res.statusCode = 422
      throw "'id' de quem você deseja seguir é obrigatório"
  }
   
    const authenticationData = new Authentication().getData(token);

    if (id_following === authenticationData.id) {
      res.statusCode = 422
      throw "Você não pode seguir você mesmo!"
  }
 const result = await new UserData().getUserById(id_following);

    if(!result){
      res.statusCode = 422
      throw "usuário não encontrado, id inválido!"
    }

    const user = await new FollowerData().unfollow(authenticationData.id,id_following);
    
    if (result && authenticationData.id){

    const user_following = result.name

      res.status(200).send(`Você deixou de seguindo ${user_following}  `);
    }
  } catch (err) {
    res.status(400).send({
      message: err.message 
    });
  }
}
export default unfollow