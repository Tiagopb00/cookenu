import {UserData} from "../data/UserData";
import { Request, Response } from "express";
import {Authentication} from "../services/Authentication";


const profile = async (req: Request, res: Response) => {
  let errorCode: number = 400;
    try {
      const token = req.headers.authorization as string;

      if (!token) {
        errorCode = 401;
        throw new Error('You must be logged to access this information');
    };
      const authenticationData = new Authentication().getData(token);
      console.log(authenticationData.id)
    //   if (authenticationData.role !== "normal") {
    //     throw new Error("Only a normal user can access this funcionality");
    //   }

      const user = await new UserData().getUserById(authenticationData.id);


      res.status(200).send({
        id: user.id,
        email: user.email,
        name: user.name,
       });

    } catch (err) {
      res.status(errorCode).send({
        message: err.sqlMessage || err.message
      });
    }
  }
  export default profile 