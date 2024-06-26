const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

async function sendVerificationEmail(Email) {
  try {
    // Generate verification token
    const token = jwt.sign({ Email}, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smpt.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: 'Email Verification for travelWebsite',
      text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/handleVerifyEmail?token=${token}`,
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
    // console.log(req);
    if (!token) {
      return res.status(400).json({ message: 'from handleVerifyEmail Verification token is required.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.Email) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }

    // Update user's email verification status in the database atomically
    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.Email },
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
    
    if(!Username){
      return res.status(400).json({ message: 'Username is required' });
    }
    else if(!Email){
      return res.status(400).json({ message: 'Email is required' });
    }
    else if(!Password){
      return res.status(400).json({ message: 'Password is required' });
    }
    // Check if the email already exists
    const existingUser = await User.findOne({ email: Email });
    const existingEmail = await User.findOne({ name: Username });
    if (existingEmail) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    else if(existingUser){
      return res.status(400).json({ message: 'Username already exists.' });
    }
    
    // Create a new user instance (not saved yet)
    const newUser = new User({
      name: Username,
      email: Email,
      password: Password,
      isVerified: false,
    });
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(Email);

    // Save the new user to the database
    res.status(201).json({ message: 'User signed up successfully. Verification email sent.' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

async function handleUserSignin(req, res) {
  const { Email, Password } = req.body;
  const user = await User.findOne({ email: Email, password: Password });
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
