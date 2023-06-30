import express from 'express'

const router = express.Router()

router.get('/', (req,res)=>{
    res.send("Hello there my Friend, This is a the Auth Page")
})

export default router;