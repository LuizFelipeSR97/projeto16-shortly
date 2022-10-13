import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import joi from 'joi';
import bcrypt from 'bcrypt';

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
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

const signinSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

const urlSchema = joi.object({
    url: joi.string().required()
});

// --------------------

// -----  ROUTES  -----

server.get('/users', (req,res) => {
    connection.query('SELECT * FROM users').then(response => {
        res.send(response.rows)
    })
})

server.get('/sessions', (req,res) => {
    connection.query('SELECT * FROM sessions').then(response => {
        res.send(response.rows)
    })
})

server.get('/urls', (req,res) => {
    connection.query('SELECT * FROM urls').then(response => {
        res.send(response.rows)
    })
})




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



// --------------------


// TESTAR O ACESSO AO DB



server.get('/sessions', (req,res) => {
    console.log(connection);
    connection.query('SELECT * FROM sessions').then(response => {
        res.send(response.rows)
    })
})

server.get('/urls', (req,res) => {
    console.log(connection);
    connection.query('SELECT * FROM urls').then(response => {
        res.send(response.rows)
    })
})

server.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.PORT}`));