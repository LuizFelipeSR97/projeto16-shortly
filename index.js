import express from 'express';
import cors from 'cors';

import signUp from './routes/signUpRoute.js';
import signIn from './routes/signInRoute.js';
import postUrl from './routes/postUrlRoute.js';
import urlInfo from './routes/urlInfoRoute.js';
import redirect from './routes/redirectRoute.js';
import deleteUrl from './routes/deleteUrlRoute.js';
import userInfo from './routes/userInfoRoute.js';
import ranking from './routes/rankingRoute.js';
import { connection } from './db/db.js';

const server = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

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

server.get('/users', async (req,res) => {
    res.send(await connection.query('SELECT * FROM users;'))
});

server.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.PORT}`));

//Problema com o banco de novo