import { Router } from "express";
import userMW from "../middleware/user-middleware";
import userService from "../service/user-service";
import bcrypt from 'bcrypt';
import { User } from "../interface/user-interface";


const router = Router();

router.post("/login", async (req,res)=>{
    let {email, password} = req.body;
    let user = await userService.findOneUser(email);
    let result = false;

    if(user) result = await bcrypt.compare(password, user.password);

    if(result){
        let token = userService.genToken(user as User);
        res.json({token});
    } else{
        res.status(400).send('email or password incorrect');
    }


})

router.post("/save", userMW.userToken, userMW.validate,async (req,res)=>{
    let {name,email,password} = req.body;

    let result = await userService.save({name,email,password});

    result ? res.status(201).send('user created sucessfully') : res.status(400).send('user alredy exist');
})

export default router;