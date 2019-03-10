// This is an example file. To get started, move it to the ./private directory and add your information.

/** Database connection configuration.
 * This information is passed to Sequelize to connect to the database.
 * @see http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection
 */
module.exports.database = {
    name: 'YOUR_DATABASE_NAME',
    username: 'YOUR_DATABASE_USERNAME',
    password: 'YOUR_DATABASE_PASSWORD',
    options: {
        dialect: 'postgresql',
        operatorsAliases: false,
        logging: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
}
