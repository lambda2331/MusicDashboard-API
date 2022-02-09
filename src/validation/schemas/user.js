const { mergeSchemas } = require("..")

const LoginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email"
        },
        password: {
            type: "string",
            format: 'password'
        }
    },
    required: ["email", 'password'],
    additionalProperties: false
}

const RegisterSchema = mergeSchemas(LoginSchema, {
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 2
        }
    },
    required: ["username"]
})

module.exports = {
    RegisterSchema,
    LoginSchema
}