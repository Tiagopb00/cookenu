import { Request, Response } from "express";
import { generateId } from "../services/generateId";
import { UserData } from "../data/UserData";
import { Authentication } from "../services/Authentication";
import HashManager from "../services/HashManager";
import {v4} from "uuid"; 


const signup = async (req: Request, res: Response) => {
  try {

    if (!req.body.email || req.body.email.indexOf("@") === -1) {
      throw new Error("Invalid email");
    }

    if (!req.body.password || req.body.password.length < 6) {
      throw new Error("Invalid password");
    }

    const { name, email, password } = req.body
    let role = req.body.role

    const id = generateId();
    const hm: HashManager = new HashManager()
    const cryptedPassword = await hm.hash(password)


    const sending = new UserData()
    await sending.createUser(id, name, email, cryptedPassword)

    const token = new Authentication().generateToken({
      id
    });

    res.status(200).send({
      token,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
}
export default signup