const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {};
// get all Courses
userController.signUp = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !password || !email) {
			return res.status(400).json({ message: 'Username, password, email are required.' });
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'User already exists.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = { name, password: hashedPassword, email };
		await User.create(newUser);

		const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

		return res.status(200).json({ msg: 'User Created Successfully', token: token });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

userController.signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!password || !email) {
			return res.status(400).json({ message: 'Username, password, email are required.' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User does not exists.' });
		}

		const hashedPassword = await bcrypt.compare(password, user.password);

		if (hashedPassword) {
			const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
			return res.status(200).json({ msg: 'Login Successfull', token: token });
		} else {
			return res.status(401).json({ message: 'Invalid username or password.' }, token);
		}
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

userController.logout = async (req, res) => {
	// later
};

module.exports = userController;
