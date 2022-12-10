const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const jwtsecret = process.env.JWT_SECRET_KEY;



const validateError = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg 
        })
    }
}




const signupUser = async (req, res) => {
    const { name, email, phone, password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg 
        })
    }
         
    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(400).json({error: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, phone, password: hashedPassword });

        const token = jwt.sign({ email: user.email, id: user._id }, jwtsecret, { expiresIn: '1d' });

        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}




const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg 
        })
    }

    try {
        const existingUser = await User.findOne({ email});

        if (!existingUser) return res.status(404).json({ error: 'User not found'}); 

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ error: 'Invalid Credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtsecret, { expiresIn: '1d' });

        res.status(200).json({user: existingUser, token});
    } catch (error) {
        res.status(500).json({error: "Something went wrong"})
    }
}





const updateUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg 
        })
    }

    try {
        const userId = req.userId;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.findByIdAndUpdate(userId, { $set: { name, email, phone, password: hashedPassword } }, { new: true });

        res.status(200).json({ user });
        
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}




const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
}




const deleteUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findByIdAndDelete(userId);
        res.status(200).json({user});
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { signupUser, loginUser, updateUser, getUser, deleteUser }

