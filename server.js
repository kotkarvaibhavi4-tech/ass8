
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Student');

const app = express();

app.use(express.json());

// CREATE a student
app.post('/students', async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

// READ all students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// READ one student
app.get('/students/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
});

// UPDATE a student
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(student);
});

// DELETE a student
app.delete('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully', student });
});

app.get('/', (req, res) => {
    res.send('Student Record API is running!');
});

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => {
        console.log('MongoDB connected successfully!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
             console.log('http://localhost:3000/students');
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error.message);
    });
