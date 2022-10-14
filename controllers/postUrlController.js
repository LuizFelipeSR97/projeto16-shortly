import {connection} from '../db/db.js';
import {nanoid} from 'nanoid';

async function postUrl(req,res){

    function verifyURL(link) {
        var regexp = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum
        return regexp.test(link);
    }

    const {url} = req.body;

    const isURL = verifyURL(url)

    if (!isURL){
        return res.sendStatus(422)
    }

    const shortUrl = nanoid()

    await connection.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1,$2,$3);`,[res.locals.userId,url,shortUrl])

    return res.status(201).send({shortUrl: shortUrl})

}

export {postUrl};