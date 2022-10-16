import {connection} from '../db/db.js';

async function userInfo(req,res){

    console.log(res.locals.userId)

    let urlsSearched = await connection.query('SELECT id, "shortUrl", url, visitors AS "visitCount" FROM urls	WHERE "userId" = $1;',[res.locals.userId])

    const userUrls = urlsSearched.rows
    console.log(userUrls)

    const userSearched = await connection.query(`SELECT urls."userId" AS id, users.name, SUM(urls.visitors) AS "visitCount" FROM urls JOIN users ON urls."userId" = users.id WHERE urls."userId" = $1 GROUP BY urls."userId", users.name;`,[res.locals.userId])

    console.log("UserSearched = ")
    console.log(userSearched)

    //const response = {id: userSearched.rows[0].id, name: userSearched.rows[0].name, visitCount: userSearched.rows[0].visitCount, shortenedUrls: userUrls}
    const response = {
        "id": 10,
          "name": "teste",
          "visitCount": 0,
          "shortenedUrls": []
      }

    return res.send(response)

}

export {userInfo};