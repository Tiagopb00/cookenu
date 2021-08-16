export class CustomError extends Error {

    protected statusCode: number;

    constructor(message: string, statusCode: number = 400){
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends CustomError {
    constructor(){
        super("Recurso não encontrado", 404);
    }
}
