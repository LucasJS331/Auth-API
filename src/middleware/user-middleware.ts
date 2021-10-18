import { NextFunction, Request, Response } from "express";
import userValidation from "../validator/user-validation";
import jwt from 'jsonwebtoken';

class UserMiddleware{
    
    validate(req: Request, res: Response, next: NextFunction){
        let {name,email,password} = req.body;

        let result = userValidation.validateUser({name,email,password});

        if(result.status === 200){
            next()
            return;
        }

        res.status(400).json({statusCode: result.status, errors: result.message});
    }

    userToken(req: Request, res: Response, next: NextFunction){
        const authToken = req.headers['authorization']

        if(authToken != undefined){
            const bearer = authToken.split(' ');
            var token = bearer[1];

            try{
                var decoded = jwt.verify(token,process.env.TOKEN_SECRET as string);
                
                if(decoded){
                    next();
                }else{
                    res.status(401).send("you don't have permission!");
                    return;
                }
            }catch(err){
                res.status(400).send("token expired!");
                return;
            }
        }else{
            res.status(401).send("you're not authenticated");
            return;
        }

    }
}

export default new UserMiddleware();