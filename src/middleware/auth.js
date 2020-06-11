const jwt = require('jsonwebtoken')
const Account = require('../models/account')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'this-is-new-token')
        const account = await Account.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!account) {
            throw new Error()
        }

        req.token=token
        req.account = account
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth