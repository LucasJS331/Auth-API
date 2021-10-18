import express from 'express';
import router from './router/router';
import mongoose from 'mongoose';
import * as path from 'path';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userService from './service/user-service';


const app = express();
const port = 3000;

//basic config

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/user', router);
app.use(morgan('dev'));
dotenv.config({path: path.resolve(__dirname, './.env')});

mongoose.connect(process.env.MONGO_URL as string)
.then(()=>{
    console.log('mongo is connected!');
    userService.adminInit();
})
.catch((err) => console.log(err));


app.listen(port, ()=>{
    console.log(`this aplication is running on port ${port}`);

})