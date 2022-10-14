import {connection} from '../db/db.js';

async function deleteUrl(req,res){

    const id = req.params.id;

    const urlSearched = await connection.query('SELECT * FROM urls WHERE id = $1;',[id])

    if (urlSearched.rowCount===0){
        return res.sendStatus(404)
    }

    if (urlSearched.rows[0].userId != res.locals.userId){
        return res.sendStatus(401)
    }

    await connection.query('DELETE FROM urls WHERE id = $1;',[id])

    return res.sendStatus(204) 

}

export {deleteUrl};