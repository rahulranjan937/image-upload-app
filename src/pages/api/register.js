import connectDB from '../../utils/connectDB.js';
import User from '@/models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  if (!payload.name || !payload.email || !payload.password) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    const user = await User.findOne({ email: payload.email });

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    payload.password = hashedPassword;

    const newUser = new User(payload);
    await newUser.save();

    // Create token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
