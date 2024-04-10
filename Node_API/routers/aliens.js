const express = require('express');
const router = express.Router();
const hp = require('../models/hp');

router.get('/', async(req, res) => {
    try{
        const harryPorter = await hp.find()
        res.json(harryPorter)
    }catch(err){
        res.send("Error "+err)
    }
});
router.get('/:name', async(req, res) => {
    try {
        const harryPorter = await hp.findOne({ name: req.params.name });
        if (!harryPorter) {
            return res.status(404).json({ message: 'Harr not found' });
        }
        res.json(harryPorter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.post('/', async(req, res) => {
    try {
        const harryPorter = new hp({
            name: req.body.name,
            img: req.body.img,
            summary: req.body.summary
        });
        await harryPorter.save();

        res.status(201).json(harryPorter); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.patch('/:id', async(req, res) => {
    try {
        const harryPorter = await hp.findById(req.params.id);
        if (!harryPorter) {
            return res.status(404).json({ message: 'Harry Potter not found' });
        }

        harryPorter.name = req.body.name;
        harryPorter.img = req.body.img;
        harryPorter.summary = req.body.summary;

       
        const updatedHarryPorter = await harryPorter.save();
        res.json(updatedHarryPorter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {
    try {
        const deletedHarryPorter = await hp.findByIdAndDelete(req.params.id);
        if (!deletedHarryPorter) {
            return res.status(404).json({ message: 'Harry Potter not found' });
        }
        res.json({ message: 'Harry Potter deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
