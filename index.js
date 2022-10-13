import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

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

// TESTAR O ACESSO AO DB

server.get('/users', (req,res) => {
    console.log(connection);
    connection.query('SELECT * FROM users').then(response => {
        res.send(response.rows)
    })
})

server.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.PORT}`));