import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import signUp from './routes/signUpRoute.js';
import signIn from './routes/signInRoute.js';
import postUrl from './routes/postUrlRoute.js';
import urlInfo from './routes/urlInfoRoute.js';
import redirect from './routes/redirectRoute.js';
import deleteUrl from './routes/deleteUrlRoute.js';
import userInfo from './routes/userInfoRoute.js';
import ranking from './routes/rankingRoute.js';

const server = express();
dotenv.config();

server.use(express.json());
server.use(cors());
server.use(signUp);
server.use(signIn);
server.use(postUrl);
server.use(urlInfo);
server.use(redirect);
server.use(deleteUrl);
server.use(userInfo);
server.use(ranking);

server.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.PORT}`));


/* Falta:
    - Fazer o dump
    - Fazer a verificacao no body da route (/urls/shorten) se a url é valida com REGEX
    - Colocar DATABASE_URL no dotenv (o que seria?)
    - Fazer o deploy do backend e do banco com o Heroku
 */

    /*
    REGEX
    
    function isURL(link) {
        var regexp = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum
        return regexp.test(link);
    } */