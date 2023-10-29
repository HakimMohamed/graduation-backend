require('dotenv').config();
const express = require('express');
const app = express();
const testRoutes = require('./routes/test');
const connectDB = require('./db/connect');
const course = require('./routes/course');

app.use(express.json());
app.use('/api/test', testRoutes);
app.use('/api/course', course);

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
