import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validate Email
  const user = await User.findOne({ email })

  // Validate Email & Password
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })

    // Set JWT as an HTTP-Only Cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('Register User')
})

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler((req, res) => {
  res.send('Get User Profile')
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler((req, res) => {
  res.send('Update User Profile')
})

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler((req, res) => {
  res.send('Get Users')
})

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler((req, res) => {
  res.send('Get user by id')
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler((req, res) => {
  res.send('Update user')
})

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler((req, res) => {
  res.send('Delete User')
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
