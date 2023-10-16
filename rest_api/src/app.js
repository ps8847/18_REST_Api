const express = require("express");
require("./db/conn")
const Student = require("./models/students")
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());



// create  a new students 
// app.post("/students", (req, res) => {

//     // console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// })

// method 2

app.post('/students', async(req, res) => {

    try {
        const user = new Student(req.body);

        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) {
        res.status(400).send(e);
    }
})


// read the data of registered students

app.get('/students', async(req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

// the above code wil generate our own api

// in the link >>>>> localhost:8000/students  


// get the individual student data using id

// app.get('/students/:id', async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const studentData = await Student.findById({ _id });

//         if (!studentData) {
//             return res.status(404).send();
//         } else {
//             res.send(studentData);
//         }

//     } catch (e) {
//         res.statusCode(500).send(e);
//     }
// })

// to run the above code >>> go to postman and run the url as ...>>>   localhost:8000/students/_idd

// get the individual student data using name 

// app.get('/students/:name', async(req, res) => {
//     try {
//         const name = req.params.name;
//         const studentData = await Student.find({ name });

//         if (!studentData) {
//             return res.status(404).send();
//         } else {
//             res.send(studentData);
//         }

//     } catch (e) {
//         res.statusCode(500).send(e);
//     }
// })


//update the students by id

// app.patch('/students/:id', async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const UpdatestudentData = await Student.findByIdAndUpdate(_id, req.body, {
//             new: true
//         });

//         res.send(UpdatestudentData);

//     } catch (e) {
//         res.statusCode(500).send(e);
//     }
// })


// delete student data by id

app.delete('/students/:id', async(req, res) => {
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



app.listen(port, () => {
    console.log(`connection is successsfull at port ${port}`);
})


// you do not need express.json() and express.urlencoded()
// for get requests or delete requests. we only need it for
// post and put req.

// express.json() is a method inbuild in expresss to recognize the incoming
// Request Object as a Json object. this method is called as a middleware
// in your application using the code : app.use(express.json());