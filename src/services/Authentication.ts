import { AuthenticationData } from "../types";

import * as jwt from "jsonwebtoken";

  const expiresIn = "60min";

export class Authentication {
    generateToken = (input: AuthenticationData): string =>{
    const token = jwt.sign(
      {
        id: input.id,
      },
      "palavra" as string,
      {
        expiresIn
      }
    );
    return token;
  }

   getData = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, "palavra" as string) as any;
    const result = {
      id: payload.id
    };
    return result;
  }

  }