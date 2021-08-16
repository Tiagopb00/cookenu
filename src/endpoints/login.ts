import { Request, Response } from "express";
import {UserData} from "../data/UserData";
import { Authentication } from "../services/Authentication";
import HashManager from "../services/HashManager";


const login = async (req: Request, res: Response) => {
  let errorCode: number = 400;
    try {

      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      const { email, password} = req.body

      const user = await new UserData().getUserByEmail(email);
      
      if ( !user ) {
        errorCode = 404;
        throw new Error("User not found");
    };

      const hm = new HashManager()
      const compare =  await hm.compare(password, user.password)

      if (!compare) {
        throw new Error("Invalid password");
      }

      const token = new Authentication().generateToken({
        id: user.id
      });

      res.status(200).send({
        token,
      });
    } catch (err) {
      res.status(errorCode).send({message: err.sqlMessage || err.message});
    }
  }
  export default login 