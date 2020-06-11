const express = require('express')
const Orgnization = require('../models/orgnization')
const auth = require('../middleware/auth')

const router =  new express.Router()

router.post('/orgnizations/add', async (req, res) => {
    const orgnization = new Orgnization({
        ...req.body,
        account:req.account._id
    })
    await orgnization.populate('account').execPopulate()

    try {
        await orgnization.save()
       
        res.status(201).send(orgnization)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/orgnizations',auth,async(req,res)=>{

    try {
        const orgnization = await Orgnization.findOne({'account':req.account})
        
        await orgnization.populate('account').execPopulate()
            
        res.send(orgnization)
    } catch (error) {
        res.send(error)
    }
    })


router.patch('/orgnizations',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = []
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        
        const orgnization = Orgnization.findOne({account:req.account})
        updates.forEach((update) => orgnization[update] = req.body[update])
        await orgnization.save()

        res.send(orgnization)
    } catch (e) {
        res.status(400).send(e)
    }
})    

router.delete('/orgnizations',auth,async(req,res)=>{
    try {
        const orgnization = Orgnization.findOne({account:req.account})
        if(!orgnization){
            return res.status(400).send({error:"invalid orgnization"})
        }
        res.status(200).send(orgnization)
    } catch (error) {
        res.status(500).send(error)   
    }
})
module.exports = router