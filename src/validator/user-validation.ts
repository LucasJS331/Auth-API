import { User } from '../interface/user-interface';
import validator from 'validator';
import { StatusRequest } from '../interface/status-interface';

class UserValidation{
   
    validateUser(user: User): StatusRequest{

        let statusRequest: StatusRequest = {
            status: 200,
            message: [] 
        }
        if(user.email === undefined || !validator.isEmail(user.email)){
            statusRequest.status = 400;
            statusRequest.message.push('email is invalid!');
        }

        if(user.name === undefined || validator.isEmpty(user.name)){
            statusRequest.status = 400;
            statusRequest.message.push('name is invalid!');
        }

        if(user.password === undefined || validator.isEmpty(user.password)){
            statusRequest.status = 400;
            statusRequest.message.push('password is invalid!');
        } 

        return statusRequest;
    }
}

export default new UserValidation();