const express = require('express');

const router = new express.Router();
const Student = require('../models/students');

//create student
router.post('/students', async(req, res) => {

    try {
        const user = new Student(req.body);

        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) {
        res.status(400).send(e);
    }
})


// read the data of registered students

router.get('/students', async(req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})


// get the individual student data using id

router.get('/students/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById({ _id });

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }

    } catch (e) {
        res.statusCode(500).send(e);
    }
})



//update the students by id

router.patch('/students/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const UpdatestudentData = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        res.send(UpdatestudentData);

    } catch (e) {
        res.statusCode(500).send(e);
    }
})


// delete student data by id

router.delete('/students/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const DeletetudentData = await Student.findByIdAndDelete(_id);
        if (!_id) {
            return res.status(400).send();
        }
        res.send(DeletetudentData);

    } catch (e) {
        res.statusCode(500).send(e);
    }
})


module.exports = router;