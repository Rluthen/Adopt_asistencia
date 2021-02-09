const express = require('express');
const router = express.Router();
const Joi = require('joi');
const data = require('../data.json');

/*
    "istransfer": 0,
    "sheltercode": "D09125594",
    "identichipnumber": "0A11675477",
    "animalname": "Gonzo",
    "breedname": "German Shepherd Dog/Mix",
    "basecolour": "Tan",
    "speciesname": "Dog",
    "animalage": "9 years 1 month.",
    "sexname": "Male",
    "location": "Adoptable Dogs",
    "movementdate": "2017-04-24 00:00:00",
    "movementtype": "Adoption",
    "istrial": 0,
    "returndate": "",
    "returnedreason": "Stray",
    "deceaseddate": "",
    "deceasedreason": "Died in care",
    "diedoffshelter": 0,
    "puttosleep": 0,
    "isdoa": 0
*/
const animalSchema = Joi.object({
    intakedate: Joi.date(),
    intakereason: Joi.string(),
    istransfer: Joi.number(),
    sheltercode: Joi.string().alphanum(),
    identichipnumber: Joi.number(),
    animalname: Joi.string(),
    breedname: Joi.string(),
    basecolour: Joi.string(),
    speciesname: Joi.string(),
    animalage: Joi.number(),
    sexname: Joi.string(),
    location: Joi.string(),
    movementdate: Joi.date(),
    movementtype: Joi.string(),
    istrial: Joi.number(),
    returndate: Joi.date(),
    returnedreason: Joi.string(),
    deceaseddate: Joi.date(),
    deceasedreason: Joi.string(),
    diedoffshelter: Joi.number(),
    puttosleep: Joi.number(),
    isdoa: Joi.number()
});

router.get('/', (req, res) => {
    
    res.send(data);
});

router.get('/:speciesname', (req, res) => {
    const {speciesname} = req.params;

    res.send(data.find(animal => animal.speciesname = speciesname));
});

router.get('/:intakereason', (req, res) => {
    const {intakereason} = req.params;

    res.send(data.find(animal => animal.intakereason = intakereason));
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    res.send(data.find(animal => animal.id = id));
});

router.post('/', (req,res) => {
    const id = data.length + 1;
    newAnimal = req.body;
    newAnimal.id = id;
    animalSchema.validate(newAnimal);
    data.push(newAnimal);
    res.send(newAnimal);
});

module.exports = router