async function signUpPost(req, res){

    const {name, email, password, confirmPassword} = req.body;

    if (password != confirmPassword){
        return res.status(422).send('Os campos de senha e confirmação de senha devem ser iguais!')
    }

    try {

        console.log('connection')

        connection.query('SELECT * FROM users').then(user=>{
            res.send(user.rows)
        })

    } catch(err) {

        res.status(500).send(err.message)

    }

}

export {signUpPost};