require('dotenv').config();
const express = require('express');
const app = express();
const testRoutes = require('./routes/test');
const connectDB = require('./db/connect');
const cors = require('cors');

const course = require('./routes/course');
const user = require('./routes/users');
app.use(cors());

app.use(express.json());
app.use('/api/test', testRoutes);
app.use('/api/course', course);
app.use('/api/user', user);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		//ConnectDB
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};
start();
