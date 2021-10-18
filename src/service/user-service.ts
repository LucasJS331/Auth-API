import { UserSchema }  from "../schema/user-schema";
import mongoose from 'mongoose'
import { User } from "../interface/user-interface";
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

let userModel = mongoose.model("user", UserSchema);


class UserService{
    async save(user: User): Promise<boolean>{
        let result = await this.findOneUser(user.email);

        if(!result){
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(user.password, salt);
            let newUser = new userModel({
                 name: user.name,
                 email: user.email,
                 password: hash
             })
         
         
            await newUser.save();
            return true;
        }

        return false;
    }

    async findOneUser(email: string): Promise<User | void>{
        try {
          let user: User =  await userModel.findOne({email});
          return user;
        } catch (error) {
            console.log(error)
        }
    }

    genToken(user: User):string{
        var token = jwt.sign({ email: user.email}, process.env.TOKEN_SECRET as string, {expiresIn: 30000});
        return token;
    }

    async adminInit(){
        
      let user = await userModel.findOne({email: process.env.ADMIN_USER as string});

      if(user){
          console.log('admin user is ready to be used!');
          return;
      }

      let newUser: User ={
          name: 'admin',
          email: process.env.ADMIN_USER as string,
          password: process.env.ADMIN_USER_KEY as string,
      }
    
       await this.save(newUser);
        console.log('user admin successfully created!');

      
    }
}

export default new UserService();