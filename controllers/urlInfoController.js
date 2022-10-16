import {connection} from '../db/db.js';

async function urlInfo(req,res){

    const urlId = req.params.id;

    const urlSearched = await connection.query('SELECT * FROM urls WHERE id = $1;',[urlId])

    if (urlSearched.rowCount===0){
        return res.sendStatus(404)
    }

    const {id, shortUrl, url} = urlSearched.rows[0]

    return res.status(200).send({id, shortUrl, url})

}

export {urlInfo};
