import express from 'express';
import data from './data/mock.json' assert { type: "json" };

const app = express();

const PORT = 3000;

// Using the public folder at the root of the project
app.use(express.static("public"));
// This is the URL that we're going to test: http://localhost:3000/mountains_1.jpeg

// Using the images folder at the route /images
app.use('/images', express.static("images"));
// This is the URL that we're going to test: http://localhost:3000/images/mountains_2.jpeg

// GET
app.get('/', (req, res) => {
    res.json(data);
});

// GET with Routing Parameters
app.get('/class/:id', (req, res) => {
    const studentId = Number(req.params.id);

    const student = data.filter((student) => student.id === studentId);
    res.send(student);

});

// POST
app.post('/create', (req, res) => {
    res.send('This is a POST request at /create');
});

// PUT
app.put('/edit', (req, res) => {
    res.send('This is a PUT request at /edit');
});

// DELETE
app.delete('/delete', (req, res) => {
    res.send('This is a DELETE request at /delete');
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

