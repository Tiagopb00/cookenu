import { Request, Response } from "express";
import { UserData } from "../data/UserData";
import { Authentication } from "../services/Authentication";

const getProfileById = async (req: Request, res: Response) => {
    let errorCode: number = 400;
    try {
        const id = req.params.id
        const token = req.headers.authorization as string;

        const authenticationData = new Authentication().getData(token);
        console.log(`sim`, authenticationData)
        //se este token retornar o id da pessoa que segue o id do params pode liberar o perfil .. 
        //buscar na tabela join se o user do token tem o seguidor que ele procura o id
        if (!id || !token) {
            res.statusCode = 422
            throw "'id' e 'token'são obrigatórios"
        }

        const userSearch = new UserData()
        const getUser = await userSearch.getUserById(id)
        console.log(getUser)
        if (!getUser) {
            throw new Error("nenhum usuario encontrado com esse id")
        }
        const foundUser = getUser
        res.status(200).send(getUser)

    } catch (err) {
        res.status(errorCode).send({ message: err.sqlMessage || err.message });
    }
}
export default getProfileById