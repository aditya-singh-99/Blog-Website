import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import Token from '../models/Token.js'

export const signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, username: req.body.username, password: hashedPassword }
    const newUser = new User(user)
    await newUser.save()
    res.status(200).json({ msg: 'Signup successfull' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error while signing up the user' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(400).json({ msg: 'No user found with given username' })
    }
    const result = await bcrypt.compare(req.body.password, user.password)
    if (!result) {
      return res.status(400).json({ msg: 'Wrong password' })
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
    const token = new Token({ token: refreshToken })
    await token.save()
    res.status(200).json({ name: user.name, username: user.username, accessToken, refreshToken })
  } catch (error) {
    res.status(500).json({ msg: 'Server error while signing up the user' })
  }
}