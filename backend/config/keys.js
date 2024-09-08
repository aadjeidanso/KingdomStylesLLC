module.exports = {
    mongoURI: process.env.MONGODB_URI,
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    },
    jwtSecret: process.env.JWT_SECRET
};
