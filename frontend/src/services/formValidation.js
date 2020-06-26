import Joi from "joi-browser";

export const loginValidate = (formObject) => {


    const schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        password: Joi.string()
            .required()
            .min(3)
            .max(30)
            .label("Password")
    }

    const { error } = Joi.validate(formObject, schema, { abortEarly: false })

    if (!error) return null;

    const errorMessages = {}
    error.details.map((item) => {
        if (!errorMessages[item.path[0]]) {
            return errorMessages[item.path[0]] = [item.message]
        }
        return errorMessages[item.path[0]].push(item.message)
    })

    return errorMessages;
}

export const registerValidate = (user) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        password: Joi.string().required(),

        repeatPassword: Joi.ref('password'),
    }).with('password', 'repeatPassword')

    const { error } = schema.validate(user, { abortEarly: false });
    if (!error) return null;

    const errorMessages = {}
    error.details.map((item) => {
        if (!errorMessages[item.path[0]]) {
            return errorMessages[item.path[0]] = [item.message]
        }
        return errorMessages[item.path[0]].push(item.message)

    })

    return errorMessages;

}
