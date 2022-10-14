import { urlSchema, signInSchema, signUpSchema } from "../schemas/schemas.js";

async function signInValidation(req, res, next){

    const validation = signInSchema.validate(req.body, {abortEarly: false});

    if (validation.error){

        const errors = validation.error.details.map(err=>err.message);
        return res.status(422).send(errors)

    }

    next();

}

async function signUpValidation(req, res, next){

    const validation = signUpSchema.validate(req.body, {abortEarly: false});

    if (validation.error){

        const errors = validation.error.details.map(err=>err.message);
        return res.status(422).send(errors)

    }

    next();

}

async function urlValidation(req, res, next){

    const validation = urlSchema.validate(req.body, {abortEarly: false});

    if (validation.error){

        const errors = validation.error.details.map(err=>err.message);
        return res.status(422).send(errors)

    }

    next();

}

export {signInValidation, signUpValidation, urlValidation};