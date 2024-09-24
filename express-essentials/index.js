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

// Using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

// GET
app.get('/', (req, res) => {
    res.json(data);
});

// POST - express.json and express.urlencoded
app.post('/item', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// GET - download method
app.get('/download', (request, response) => {
    response.download('images/mountains_2.jpeg')
})

// GET - redirect method
app.get('/redirect', (request, response) => {
    response.redirect('http://www.linkedin.com')
})

//Route chaining
app.route('/class')
.get((request, response) => {
    //response.send('Retrieve class info')
    throw new Error();
})
.post((request, response) => {
    response.send('Create class info')
})
.put((request, response) => {
    response.send('Update class info')
})

// GET
// app.get('/class', (request, response) => {
//     response.send('Retrieve class info')
// });

// POST
// app.post('/class', (request, response) => {
//     response.send('Create class info')
// });

// PUT
// app.put('/class', (request, response) => {
//     response.send('Update class info')
// })

// GET with next()
app.get('/next', (req, res, next) => {
    console.log("The response will be sent by the next function.");
    next(); // First callback function within the route handler
},  (req, res) => {
    res.send("I just set up a route with a second callback."); // Second callback
}
);

// GET with Routing Parameters
app.get('/class/:id', (req, res) => {
    // Middleware: Access the routing parameters
    const studentId = Number(req.params.id);

    const student = data.filter((student) => student.id === studentId);
    // Everything above this line is middleware
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
    // Make sure to make your error message as informative as possible for the user based on your application
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

