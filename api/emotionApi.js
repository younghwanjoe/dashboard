const express = require('express');
let router = express.Router()
const pd = require('paralleldots')

pd.apiKey = process.env.paralletdotsApiKey;


router.post('/submit',async(req,res,next) => {
    const emotionText = req.body.text
    const language = req.body.target
    pd.emotion(emotionText,language)
    .then((response) => {
        res.send(response)
    }).
    catch((error) => {
        res.send({error:"지원하지 않는 언어입니다"})
    })
})
module.exports = router