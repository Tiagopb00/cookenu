import connection from './connection'
import { user } from '../types';

const userTable = "userTable";

export class UserData {

createUser = async (id: string, name:string, email: string, password: string): Promise<void> => {
  await connection
      .insert({
        id,
        name,
        email,
        password
      })
      .into(userTable);
  }

  getUserByEmail = async(email: string): Promise<any> => {
    const result = await connection
      .select("*")
      .from(userTable)
      .where({ email });

    return result[0];
   }

   getUserById= async (id: string): Promise<user> => {
    const result = await connection
      .select("id", "name", "email")
      .from(userTable)
      .where({ id });

      return result[0];
  }

}