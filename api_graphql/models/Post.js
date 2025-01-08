const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Post = sequelize.define('Post', {
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Post;