/** Name of model */
const name = 'Comment'

/** Model schema definition */
const model = (sequelize, DataTypes) => {
  return sequelize.define(name, {
    /** Meta information */
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['hold', 'approved', 'spam', 'trash']
    },
    authorName: DataTypes.STRING,
    authorEmailAddress: DataTypes.STRING,
    authorIp: DataTypes.STRING,
    authorUserAgent: DataTypes.STRING,
    authorReferrer: DataTypes.STRING,
    content: DataTypes.TEXT
  })
}

/** Model associations */
const associations = (models) => {
  /** User */
  models.Comment.belongsTo(models.User, { as: 'Author', constraints: false })

  /** Post */
  models.Comment.belongsTo(models.Post, {constraints: false})

  /** Replies */
  models.Comment.hasMany(models.Comment, { as: 'Reply', foreignKey: 'ReplyToCommentId', constraints: false })
  models.Comment.belongsTo(models.Comment, { as: 'ReplyTo', foreignKey: 'ReplyToCommentId', constraints: false })
}

module.exports = { name, model, associations }
