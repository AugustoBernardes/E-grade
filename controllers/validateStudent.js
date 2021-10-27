const Joi = require('@hapi/joi')

const studentValidate = (data) => {
    const schema = Joi.object({
        name:Joi.string().required(),
        cpf:Joi.number().required(),
        phone:Joi.number().required(),
        classNumber:Joi.number().required(),
    })

    return schema.validate(data)
}

module.exports = studentValidate