const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {};
// get all Courses
userController.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !password || !email) {
			return res.status(200).json({ msg: 'Username, password, email are required.' });
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(200).json({ msg: 'Exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = { name, password: hashedPassword, email };
		await User.create(newUser);

		const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '365d' });
		console.log('login');
		return res.status(200).json({ msg: 'User Created Successfully', token: token });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

userController.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!password || !email) {
			return res.status(400).json({ msg: 'Username, password, email are required.' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(200).json({ msg: 'User does not exists.' });
		}

		const hashedPassword = await bcrypt.compare(password, user.password);

		if (hashedPassword) {
			const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '365d' });
			return res.status(200).json({ msg: 'Success', token: token });
		} else {
			return res.status(200).json({ msg: 'Invalid username or password.' });
		}
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

userController.validateUser = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(200).json({ status: 'failed', msg: 'Email does not exist.' });
		}
		return res.status(200).json({ status: 'success', msg: 'Success' });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

userController.changePassword = async (req, res) => {
	try {
		const { password, confirmPassword, email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(200).json({ status: 'failed', msg: 'Email does not exist.' });
		}

		if (password !== confirmPassword) {
			return res.status(200).json({ status: 'failed', msg: 'Password and confirm password does not match.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.updateOne({ _id: user._id }, { password: hashedPassword });

		const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '365d' });
		return res.status(200).json({ status: 'success', msg: 'Password Changed Successfully.', token: token });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
userController.logout = async (req, res) => {
	// later
};

module.exports = userController;
