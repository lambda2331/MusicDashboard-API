const Ajv = require('ajv')
const addFormats = require("ajv-formats")
let instance = null

function initAjv() {
    if (instance) {
        return instance
    }

    instance = new Ajv({ allErrors: true })
    addFormats(instance)

    return instance
}

function parseErrors(errors) {
    return errors.map(({ message }) => ({ message }))
}

function mergeSchemas(schema1, schema2) {
    if (schema1.type !== schema2.type) {
        throw new Error('Scemas should have the same type')
    }

    const merge = (obj1, obj2) => {
        const result = { ...obj1 };

        Object.keys(obj2).forEach((key) => {
            if (typeof obj2[key] !== "object") {
                result[key] = obj2[key];
                return;
            }

            if (Array.isArray(obj2[key])) {
                result[key] = [...result[key], ...obj2[key]];
                return;
            }

            result[key] = merge(result[key], obj2[key]);
        });

        return result;
    }

    return merge(schema1, schema2)
}

module.exports = {
    validation: initAjv(),
    parseErrors,
    mergeSchemas
}