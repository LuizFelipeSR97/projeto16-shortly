import {connection} from '../db/db.js';

async function ranking(req,res){

    const ranking = await connection.query(`SELECT urls."userId" AS id, users.name, COUNT (urls."userId") AS "linksCount", SUM(urls.visitors) AS "visitCount" FROM urls JOIN users ON urls."userId" = users.id GROUP BY urls."userId", users.name ORDER BY "visitCount" DESC LIMIT 10;`)
    
    return res.status(200).send(ranking.rows)
}

export {ranking}