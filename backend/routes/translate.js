var express = require('express');
var router = express.Router();

const {Translate} = require(
    '@google-cloud/translate'
).v2;
// Project id from config.json
const config = require('../google-cloud-config')
const translate = new Translate(config);

let text = "아 한강가서 치맥하고싶다"
let target = 'en';
let model = 'nmt';

async function translateTextWithModel() {

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

router.get("/", async (req, res, next)=> {
    const result = await translateTextWithModel()
    console.log(result)
    res.render("translate",{
        text: result.text,
        translation: result.translation,
        target: result.target
    }
  );
});

module.exports = router


