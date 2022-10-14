import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import joi from 'joi';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import {nanoid} from 'nanoid';

const server = express();
dotenv.config();

const {Pool} = pg;

const connection = new Pool ({
    user: 'postgres',
    password: '1401',
    host: 'localhost',
    port: 5432,
    database: 'shortly'
})

server.use(express.json());
server.use(cors());

// ----- SCHEMAS -----

const signupSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(1).required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.string().min(1).required()
});

const signinSchema = joi.object({
    email: joi.string().min(1).required(),
    password: joi.string().min(1).required()
});

const urlSchema = joi.object({
    url: joi.string().required()
});

// -----  ROUTES  -----

server.post('/signup', async (req,res) => {

    let {name, email, password, confirmPassword} = req.body;

    const validation = signupSchema.validate(req.body, {abortEarly: false});

    if (validation.error){

        const errors = validation.error.details.map(err=>err.message);
        return res.status(422).send(errors)

    }

    if (password != confirmPassword){
        return res.sendStatus(422)
    }

    const users = await connection.query('SELECT * FROM users WHERE email = $1;',[email])

    if (users.rowCount > 0){
        return res.sendStatus(409)
    }

    // Fazer um post do novo usuario

    password = bcrypt.hashSync(password, 10)

        // Falta usar a hash no password

    connection.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3);',[name,email,password]).then(result => {res.sendStatus(201)})

    return

});

server.post('/signin', async (req,res) => {

    const {email, password} = req.body;

    const validation = signinSchema.validate(req.body, {abortEarly: false});

    if (validation.error){

        const errors = validation.error.details.map(err=>err.message);
        return res.status(422).send(errors)

    }

    const users = await connection.query('SELECT * FROM users WHERE email = $1;',[email])

    const userId = users.rows[0].id;

    if (users.rowCount === 0){
        return res.sendStatus(401)
    }

    const passwordIsValid = bcrypt.compareSync(password, users.rows[0].password)

    if (!passwordIsValid){
        return res.sendStatus(401)
    }

    let token = uuid();

    connection.query('INSERT INTO sessions (token, "userId") VALUES ($1,$2);',[token, userId])

    return res.status(200).send({token: token})
});

server.post('/urls/shorten', async (req,res) => {

    const {url} = req.body;
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ','');

    const validation = urlSchema.validate(req.body, {abortEarly: false});

    if (validation.error){

        const errors = validation.error.details.map(err=>err.message);
        return res.status(422).send(errors)

    }

    if (!token){
        return res.sendStatus(401)
    }

    const tokenSession = await connection.query('SELECT * FROM sessions WHERE token = $1;',[token])

    if (tokenSession.rowCount===0){
        return res.sendStatus(401)
    }

    const userId = tokenSession.rows[0].userId

    const shortUrl = nanoid()

    await connection.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1,$2,$3);`,[userId,url,shortUrl])

    return res.status(201).send({shortUrl: shortUrl})
});

server.get('/urls/:id', async (req,res) => {

    const urlId = req.params.id;

    const urlSearched = await connection.query('SELECT * FROM urls WHERE id = $1;',[urlId])

    if (urlSearched.rowCount===0){
        return res.sendStatus(404)
    }

    const {id, shortUrl, url} = urlSearched.rows[0]

    return res.status(200).send({id, shortUrl, url})
});

server.get('/urls/open/:shortUrl', async (req,res) => {


    const shortUrl = req.params.shortUrl;

    const shortUrlSearched = await connection.query('SELECT * FROM urls WHERE "shortUrl" = $1;',[shortUrl])

    if (shortUrlSearched.rowCount===0){
        return res.sendStatus(404)
    }

    let {url, visitors} = shortUrlSearched.rows[0]
    visitors += 1

    connection.query(`UPDATE urls SET visitors=$1 WHERE "shortUrl" = $2;`,[visitors, shortUrl])

    return res.redirect(url)
});

server.delete('/urls/:id', async (req,res) => {

    const id = req.params.id
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ','');

    if (!token){
        return res.sendStatus(401)
    }

    const tokenSession = await connection.query('SELECT * FROM sessions WHERE token = $1;',[token])

    if (tokenSession.rowCount===0){
        return res.sendStatus(401)
    }

    const userId = tokenSession.rows[0].userId

    const urlSearched = await connection.query('SELECT * FROM urls WHERE id = $1;',[id])

    if (urlSearched.rowCount===0){
        return res.sendStatus(404)
    }

    if (urlSearched.rows[0].userId != userId){
        return res.sendStatus(401)
    }

    await connection.query('DELETE FROM urls WHERE id = $1;',[id])

    return res.sendStatus(204)  
});

server.get('/users/me', async (req,res) => {

    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ','');

    if (!token){
        return res.sendStatus(401)
    }

    const tokenSession = await connection.query('SELECT * FROM sessions WHERE token = $1;',[token])

    if (tokenSession.rowCount===0){
        return res.sendStatus(401)
    }

    const userId = tokenSession.rows[0].userId

    let urlsSearched = await connection.query('SELECT id, "shortUrl", url, visitors AS "visitCount" FROM urls	WHERE "userId" = $1;',[userId])

    const userUrls = urlsSearched.rows

    const userSearched = await connection.query(`SELECT urls."userId" AS id, users.name, SUM(urls.visitors) AS "visitCount" FROM urls JOIN users ON urls."userId" = users.id WHERE urls."userId" = $1 GROUP BY urls."userId", users.name;`,[userId])

    const response = {id: userSearched.rows[0].id, name: userSearched.rows[0].name, visitCount: userSearched.rows[0].visitCount, shortenedUrls: userUrls}

    return res.send(response)
});

server.get('/ranking', async (req,res) => {

    const ranking = await connection.query(`SELECT urls."userId" AS id, users.name, COUNT (urls."userId") AS "linksCount", SUM(urls.visitors) AS "visitCount" FROM urls JOIN users ON urls."userId" = users.id GROUP BY urls."userId", users.name ORDER BY "visitCount" DESC LIMIT 10
;`)



    return res.status(200).send(ranking.rows)
});

server.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.PORT}`));