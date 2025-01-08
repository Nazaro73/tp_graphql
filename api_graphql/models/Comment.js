const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id'
    }
  }
});

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

module.exports = Comment;