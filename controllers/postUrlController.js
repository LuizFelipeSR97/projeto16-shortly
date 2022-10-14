import {connection} from '../db/db.js';
import {nanoid} from 'nanoid';

async function postUrl(req,res){

    const {url} = req.body;

    const shortUrl = nanoid()

    await connection.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1,$2,$3);`,[res.locals.userId,url,shortUrl])

    return res.status(201).send({shortUrl: shortUrl})

}

export {postUrl};