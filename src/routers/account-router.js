const express = require('express')
const Account = require('../models/account')
const auth = require('../middleware/auth')


const router = new express.Router()
//dne
router.post('/accounts/signup', async (req, res) => {
    const account = new Account(req.body)

    try {
        await account.save()
        const token = await account.generateAuthToken()
        res.status(201).send({ account, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//error fe password validation
router.post('/accounts/login', async (req, res) => {
    try {
        const account = await Account.findByCredentials(req.body.email, req.body.password)
        const token = await account.generateAuthToken()
        res.send( account)
    } catch (e) {
        res.status(400).send(e)
    }
})
//dne
router.post('/accounts/logout',auth,async(req,res)=>{
    try{
        req.account.tokens = req.account.tokens.filter((token)=>{
            return token.token!==req.token

        })
        await req.account.save()
        res.send(req.account)
    }catch(e){

        res.status(500).send()
    }

})

router.post('logoutAll',auth,async(req,res)=>{
    try{
        req.account.tokens =[]
        await req.account.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/account/me', auth , async (req, res) => {
    res.send(req.account)
})

router.get('/account/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const account = await Account.findById(_id)

        if (!account) {
            return res.status(404).send()
        }

        res.send(account)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/account/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'email', 'password', 'username']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.account[update] = req.body[update])
        await req.account.save()

       

        res.send(req.account)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {
      

        await req.account.remove()
        res.send(req.account)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
