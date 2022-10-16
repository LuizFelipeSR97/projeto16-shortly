import {connection} from '../db/db.js';

async function redirect(req,res){

    const shortUrl = req.params.shortUrl;

    const shortUrlSearched = await connection.query('SELECT * FROM urls WHERE "shortUrl" = $1;',[shortUrl])

    if (shortUrlSearched.rowCount===0){
        return res.sendStatus(404)
    }

    let {url, visitors} = shortUrlSearched.rows[0]
    visitors += 1

    await connection.query(`UPDATE urls SET visitors=$1 WHERE "shortUrl" = $2;`,[visitors, shortUrl])

    return res.redirect(url)
}

export {redirect};
