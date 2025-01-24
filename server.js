const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Middleware for parsing request body
const path = require('path');

const app = express(); // Initialize Express app

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route for signup
app.post('/signup', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send('All fields are required.');
    }
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    console.log('Signup successful:', { name, email });
    res.redirect('/'); // Redirect to index.html after successful signup
});

// POST route for login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required.');
    }

    console.log('Login attempt:', { email });
    res.redirect('/'); // Redirect to index.html after successful login
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
