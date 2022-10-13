import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import joi from 'joi';

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



//SCHEMAS

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

// TESTAR O ACESSO AO DB

server.post('/signup', (req,res) => {

    //Verificar com joi se o body ta de acordo


    console.log(connection);
    connection.query('SELECT * FROM users').then(response => {
        res.send(response.rows)
    })
})

server.get('/users', (req,res) => {
    console.log(connection);
    connection.query('SELECT * FROM users').then(response => {
        res.send(response.rows)
    })
})

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