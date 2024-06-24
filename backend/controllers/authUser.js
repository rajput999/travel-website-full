const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

async function sendVerificationEmail(email) {
  try {
    // Generate verification token
    const token = jwt.sign({ email}, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/verify-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Verification email sent.');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

async function handleVerifyEmail(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.email) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }

    // Update user's email verification status in the database atomically
    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'email verified succesfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

async function handleUserSignup(req, res) {
  const { Username, Email, Password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    
    // Create a new user instance (not saved yet)
    const newUser = new User({
      username: Username,
      email: Email,
      password: Password,
      isVerified,
    });
    await newUser.save();
    
    // Send verification email
    await sendVerificationEmail(email);

    // Save the new user to the database
    res.status(201).json({ message: 'User signed up successfully. Verification email sent.' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "invalid UserName or Password",
    });
  }
}

module.exports = {
  sendVerificationEmail,
  handleVerifyEmail,
  handleUserSignup,
  handleUserSignin,
};
