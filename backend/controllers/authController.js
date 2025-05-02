const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
// controllers/auth.controller.js
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, age, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword, age, role });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Login
// auth.controller.js
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role }, // 👈 include role in token
    'your_jwt_secret',
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful', token, role: user.role });
};




// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { fullName, email, password, age, role } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) return res.status(400).json({ error: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullName,
//       email,
//       password: hashedPassword,
//       age,
//       role
//     });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       'your_jwt_secret', // Use env var in production
//       { expiresIn: '1h' }
//     );

//     res.json({ message: 'Login successful', token, role: user.role });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
