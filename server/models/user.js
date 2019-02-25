/** Name of model */
const name = 'User'

/** Model schema definition */
const model = (sequelize, DataTypes) => {
  return sequelize.define(name, {
    /** Meta */
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    /** More meta */
    username: DataTypes.STRING,
    email: DataTypes.STRING,

    /** Name */
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    displayName: DataTypes.STRING,

    /** Profile */
    photo: DataTypes.STRING,
    bio: DataTypes.TEXT,
    permissionLevel: DataTypes.INTEGER,

    /** Auth */
    authProvider: DataTypes.STRING,
    password: DataTypes.STRING,
    oauthIdentifier: DataTypes.STRING,
    resetHash: DataTypes.STRING
  })
}

/** Model associations */
const associations = (models) => {
  /** Posts */
  models.User.belongsToMany(models.Post, { through: 'PostAuthors' })
  /** Comments */
  models.User.hasMany(models.Comment, { as: 'CommentAuthor', foreignKey: 'AuthorId' })
  /** Media */
  models.User.hasMany(models.Media, { as: 'MediaAuthor', foreignKey: 'AuthorId' })
  /** Collections */
  models.User.belongsToMany(models.Collection, { through: 'CollectionAuthors' })
}

module.exports = { name, model, associations }
