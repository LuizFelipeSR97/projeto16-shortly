import bcrypt from 'bcrypt';
import {connection} from '../db/db.js';
import {v4 as uuid} from 'uuid';

async function signUp(req,res){

    let {name, email, password, confirmPassword} = req.body;

    if (password != confirmPassword){
        return res.status(422).send('Both password and confirmPassword must match')
    }

    const users = await connection.query('SELECT * FROM users WHERE email = $1;',[email])

    if (users.rowCount > 0){
        return res.sendStatus(409)
    }

    password = bcrypt.hashSync(password, 10)

    await connection.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3);',[name,email,password]).then(() => res.sendStatus(201))

}

async function signIn(req,res){

    const {email, password} = req.body;

    const users = await connection.query('SELECT * FROM users WHERE email = $1;',[email])

    if (users.rowCount === 0){
        return res.sendStatus(401)
    }

    const userId = users.rows[0].id;

    const passwordIsValid = bcrypt.compareSync(password, users.rows[0].password)

    if (!passwordIsValid){
        return res.sendStatus(401)
    }

    let token = uuid();

    connection.query('INSERT INTO sessions (token, "userId") VALUES ($1,$2);',[token, userId])

    return res.status(200).send({token: token})

}

export {signIn, signUp};