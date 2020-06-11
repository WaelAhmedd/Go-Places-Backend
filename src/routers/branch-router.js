const express = require('express')
const Branch = require('../models/branch')
const auth = require('../middleware/auth')

const router =  new express.Router()

router.post('/branches/add', async (req, res) => {
    const branch = new Branch({
        ...req.body,
        account:req.account._id
    })
    await branch.populate('account').execPopulate()

    try {
        await branch.save()
       
        res.status(201).send(branch)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/branches',auth,async(req,res)=>{

    try {
        const branch = await Branch.findOne({'account':req.account})
        
        await branch.populate('account').execPopulate()
            
        res.send(branch)
    } catch (error) {
        res.send(error)
    }
    })


router.patch('/branches',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = []
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        
        const branch = Branch.findOne({account:req.account})
        updates.forEach((update) => branch[update] = req.body[update])
        await branch.save()

        res.send(branch)
    } catch (e) {
        res.status(400).send(e)
    }
})    

router.delete('/branches',auth,async(req,res)=>{
    try {
        const branch = Branch.findOne({account:req.account})
        if(!branch){
            return res.status(400).send({error:"invalid branch"})
        }
        res.status(200).send(branch)
    } catch (error) {
        res.status(500).send(error)   
    }
})
module.exports = router