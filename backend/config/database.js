const { Sequelize } = require('sequelize');
require('dotenv').config();

// Koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME || 'day3_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set true untuk melihat query SQL
  }
);

// Test koneksi
sequelize.authenticate()
  .then(() => console.log('✅ Database connected!'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;

