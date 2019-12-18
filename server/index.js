require('dotenv/config')
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const morgan = require('morgan')
const app = express();
const {check, validationResult} = require('express-validator');
const auth = require('./middleware/auth');
const todoRouter = require('./resources/todo/todo.router.js')
// const {register, login} = require('./utils/auth.js')
const registerRouter = require('./routes/api/users'
)
const loginRouter = require('./routes/api/auth')
// Connect Database
connectDB();

// Init Middleware
// app.use(express.json())
app.use(express.json({extended: false}));
app.use(morgan('dev'))
// Define Routes
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/api', auth)
app.use('/api/todos', todoRouter)
// app.use('/api/todos', require('./routes/api/todos'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
