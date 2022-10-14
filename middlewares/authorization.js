import {connection} from '../db/db.js';

async function validateAuthorization(req, res, next){

    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ','');

    if (!token){
        return res.sendStatus(401)
    }

    const tokenSession = await connection.query('SELECT * FROM sessions WHERE token = $1;',[token])

    if (tokenSession.rowCount===0){
        return res.sendStatus(401)
    }

    const userId = tokenSession.rows[0].userId

    res.locals.userId = userId;

    next();

}

export {validateAuthorization};