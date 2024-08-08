const sequelize = require('../config/connection');
const {user} = require('../models');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});
    await user.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });
    process.exit(0);
}
seedDatabase();