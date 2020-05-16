require('dotenv').config()
var express = require('express');
var router = express.Router();

const {Translate} = require(
    '@google-cloud/translate'
).v2;
// Project id from config.json
const config = 
{
  projectId: process.env.googleCloudProjectId,
  keyFilename: process.env.googleCloudKeyFilename,
};
const translate = new Translate(config);

let model = 'nmt';

async function translateTextWithModel(text,target) {

    const options = {
        to: target,
        model: model
    }

    let [translations] = await translate.translate(text, options);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('번역:');
    translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
    });
    return {
        target:target,
        text:text,
        translation: translations[0]
    }
}

async function listLanguages() {
  // Lists available translation language with their names in English (the default).
  const [languages] = await translate.getLanguages();

  console.log("Languages:");
  let return_array = []
  languages.forEach((language) =>
  return_array.push(language)
    );
  return return_array;
  
}
router.post("/submit", async (req, res, next)=> {
    console.log('req',req.body)
    const text = req.body.text
    const target = req.body.target
    const result = await translateTextWithModel(text,target)

    res.send(result)
});

router.get("/listLanguages",async(req, res, nex) =>{
    const result = await listLanguages();
    res.send(result)
})

module.exports = router


