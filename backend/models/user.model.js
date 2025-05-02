// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age:      { type: Number },
  role:     { type: String, enum: ['ngo', 'volunteer'], required: true } // 👈 role added
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/db'); // you need to define this

// const User = sequelize.define('User', {
//   fullName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
 
//   role: {
//     type: DataTypes.ENUM('ngo', 'volunteer'),
//     allowNull: false
//   }
// }, {
//   timestamps: true
// });

// module.exports = User;
