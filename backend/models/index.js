const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Product = require('./Product');

// Relasi One-to-Many: Satu user dapat memiliki banyak artikel
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relasi One-to-Many: Satu post dapat memiliki banyak komentar
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// Relasi One-to-Many: Satu user dapat memiliki banyak komentar
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Sinkronisasi model dengan database
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database models synchronized!'))
  .catch(err => console.error('❌ Error synchronizing database:', err));

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Product,
};

