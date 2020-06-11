const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router =  new express.Router()
//done
router.post('/users/add', auth,async (req, res) => {
  
    const user = new User({
        ...req.body,
        account:req.account._id
    })
    console.log(user)
     await user.populate('account').execPopulate()

    try {
        await user.save()
       
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users',auth,async(req,res)=>{

    try {
        const user = await User.findOne({'account':req.account})
        
        await user.populate('account').execPopulate()
            
        res.send(user)
    } catch (error) {
        res.send(error)
    }
    })


router.patch('/users',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = []
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        
        const user = User.findOne({account:req.account})
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})    

router.delete('/users',auth,async(req,res)=>{
    try {
        const user = User.findOne({account:req.account})
        if(!user){
            return res.status(400).send({error:"invalid user"})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)   
    }
})
module.exports = router