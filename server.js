const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login
app.post('/submit', (req, res) => {
    const { name, age, email } = req.body;
    
    // Log the user details in the terminal
    console.log(`User Logged In: Name: ${name}, Age: ${age}, Email: ${email}`);
    
    // Redirect to the features page
    res.redirect('/features');
});

// Features route
app.get('/features', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'features.html'));
});

// Quizzes route
app.get('/quizzes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quizzes.html'));
});

// Class selection route
app.get('/class11.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Class 11.html'));
});

app.get('/class12.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Class 12.html'));
});

// Physics quiz route
app.get('/Physics 11.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Physics 11.html'));
});

// Chemistry quiz route
app.get('/Chemistry 11.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Chemistry 11.html'));
});

// Handle quiz submission
app.post('/submit-quiz', (req, res) => {
    const { answer, questionIndex, subject } = req.body;

    let feedback = '';
    let nextIndex = parseInt(questionIndex) + 1;

    const quizQuestions = subject === 'chemistry' ? chemistryQuestions : physicsQuestions;
    const correctAnswer = quizQuestions[questionIndex].correctAnswer;

    if (answer === correctAnswer) {
        feedback = 'Correct!';
    } else {
        feedback = 'Wrong answer! The correct answer was ' + correctAnswer + '.';
    }

    res.json({ feedback, nextIndex });
});

// Quiz questions
const physicsQuestions = [
    { question: "What is the speed of light?", options: { A: "3 x 10^8 m/s", B: "3 x 10^6 m/s", C: "3 x 10^5 m/s" }, correctAnswer: "A" },
    { question: "What is Newton's first law of motion?", options: { A: "Law of inertia", B: "Law of acceleration", C: "Law of action and reaction" }, correctAnswer: "A" },
    { question: "What is the unit of force?", options: { A: "Joule", B: "Newton", C: "Watt" }, correctAnswer: "B" },
    { question: "What is the formula for acceleration?", options: { A: "Distance/Time", B: "Force/Mass", C: "Mass/Time" }, correctAnswer: "B" },
    { question: "What is the gravitational constant?", options: { A: "9.8 m/s^2", B: "6.674 x 10^-11 N m^2/kg^2", C: "1.6 x 10^-19 C" }, correctAnswer: "B" }
];

const chemistryQuestions = [
    { question: "What is the chemical formula for water?", options: { A: "H2O", B: "CO2", C: "O2" }, correctAnswer: "A" },
    { question: "What is the pH level of pure water?", options: { A: "0", B: "7", C: "14" }, correctAnswer: "B" },
    { question: "What is the most abundant gas in the Earth's atmosphere?", options: { A: "Oxygen", B: "Carbon Dioxide", C: "Nitrogen" }, correctAnswer: "C" },
    { question: "What is the chemical symbol for gold?", options: { A: "Au", B: "Ag", C: "Pb" }, correctAnswer: "A" },
    { question: "What is the process of converting a liquid into a gas called?", options: { A: "Condensation", B: "Evaporation", C: "Sublimation" }, correctAnswer: "B" }
];

app.get('/lectures.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lectures.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
