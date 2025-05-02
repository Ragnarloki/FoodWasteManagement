const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected...");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

// const mysql = require('mysql2/promise');
// const { Sequelize } = require('sequelize');

// const DB_NAME = 'userfoodwaste';
// const DB_USER = 'root';
// const DB_PASS = '1234';
// const DB_HOST = 'localhost';

// async function createDatabaseIfNotExists() {
//   try {
//     const connection = await mysql.createConnection({
//       host: DB_HOST,
//       user: DB_USER,
//       password: DB_PASS,
//     });

//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
//     await connection.end();
//     console.log(`✅ Database '${DB_NAME}' is ready.`);
//   } catch (error) {
//     console.error('❌ Error creating database:', error);
//     process.exit(1); // stop if DB can't be created
//   }
// }

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: DB_HOST,
//   dialect: 'mysql',
// });

// (async () => {
//   await createDatabaseIfNotExists();

//   try {
//     await sequelize.authenticate();
//     console.log('✅ Connected to MySQL via Sequelize.');
//   } catch (error) {
//     console.error('❌ Sequelize connection error:', error);
//   }
// })();

// module.exports = sequelize;
