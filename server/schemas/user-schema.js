const S = require('fluent-json-schema')

const unique = S.object()
    .prop('userName', S.string().minLength(3).maxLength(20))
    .prop('email', S.string().format(S.FORMATS.EMAIL))
    .prop('phone', S.string().pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/))

const data = S.object()
    .id('#data')
    .anyOf([
        S.object().prop('userName', S.string().required()),
        S.object().prop('firstName', S.string().required()),
        S.object().prop('lastName', S.string().required()),
        S.object().prop('password', S.string().required()),
        S.object().prop('email', S.string().required()),
        S.object().prop('phone', S.string().required())
    ])
    .prop('firstName', S.string().minLength(3).maxLength(20))
    .prop('lastName', S.string().minLength(3).maxLength(20))
    .prop('password', S.string().minLength(4).maxLength(20))
    .extend(unique)

const search = S.object()
    .id('#search')
    .oneOf([
        S.object().prop('userName', S.string().required()),
        S.object().prop('email', S.string().required()),
        S.object().prop('phone', S.string().required())
    ])
    .extend(unique)

const login = S.object()
    .id('#login')
    .prop('password', S.string().minLength(4).maxLength(20).required())
    .extend(search)

const create = S.object()
    .id('#create')
    .anyOf([
        S.object().prop('userName', S.string().required()),
        S.object().prop('email', S.string().required()),
        S.object().prop('phone', S.string().required())
    ])
    .prop('firstName', S.string().minLength(3).maxLength(20).required())
    .prop('password', S.string().minLength(4).maxLength(20).required())
    .prop('lastName', S.string().minLength(3).maxLength(20))
    .extend(unique)

const id = S.object()
    .id('#id')
    .prop('id', S.integer().minimum(1).required())



const schema = S.object()
    .id('userSchema')
    .definition('data', data)
    .definition('search', search)
    .definition('login', login)
    .definition('create', create)
    .definition('id', id)
    

module.exports = schema