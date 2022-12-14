import {connection} from '../db/db.js';

async function userInfo(req,res){

    const urlsSearched = await connection.query('SELECT id, "shortUrl", url, visitors AS "visitCount" FROM urls	WHERE "userId" = $1;',[res.locals.userId])

    if (urlsSearched.rowCount===0){
        const simpleUserSearched = await connection.query('SELECT * FROM users WHERE id = $1',[res.locals.userId])
        return res.send({id: simpleUserSearched.rows[0].id, name: simpleUserSearched.rows[0].name, visitCount: 0, shortenedUrls: []})
    }
    
    const userSearched = await connection.query('SELECT urls."userId" AS id, users.name, SUM(urls.visitors) AS "visitCount" FROM urls JOIN users ON urls."userId" = users.id WHERE urls."userId" = $1 GROUP BY urls."userId", users.name;',[res.locals.userId])

    const response = {id: userSearched.rows[0].id, name: userSearched.rows[0].name, visitCount: userSearched.rows[0].visitCount, shortenedUrls: urlsSearched.rows}

    return res.send(response)
}

export {userInfo}