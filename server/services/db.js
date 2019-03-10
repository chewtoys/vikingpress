const db = maroon.config.database
const path = require('path')
const readDirectory = require('../helpers/read-directory')
const Sequelize = require('sequelize')

// Initialize database
const sequelize = new Sequelize(db.name, db.username, db.password, db.options)

let database = {}
let allAssociations = []

// Get the name of this file
const pathToModels = path.join(__dirname, '../models')

// Read the models directory
const models = readDirectory(pathToModels)

// Process each model file
models.forEach(fileName => {
  // Require the file
  const { name, model, associations } = require(path.join(pathToModels, fileName))
  // Import the model and add it to the database object
  database[name] = sequelize.import(name, model)
  // If the model has associations, save them so we can run them later
  if (associations) {
    allAssociations.push(associations)
  }
})

// Run each association function, passing in the database object as a parameter
for (let i = 0; i < allAssociations.length; i++) {
  allAssociations[i](database)
}

database.sequelize = sequelize
database.Sequelize = Sequelize

module.exports = database
