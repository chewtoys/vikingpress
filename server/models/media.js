/** Name of model */
const name = 'Media'

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
    title: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['attachment'], // This will be added to in the future
      defaultValue: 'attachment'
    },
    mimeType: DataTypes.STRING,
    slug: DataTypes.STRING,

    /** More information */
    altText: DataTypes.STRING,
    caption: DataTypes.TEXT,

    /** Paths to photo files */
    path: DataTypes.STRING,
    sizes: DataTypes.ARRAY(DataTypes.STRING)
  })
}

/** Model associations */
const associations = (models) => {
  /** Posts */
  models.Media.belongsTo(models.Post, { as: 'Attachment', foreignKey: 'AttachedToPostId', constraints: false })

  /** Authors */
  models.Media.belongsTo(models.User, { as: 'Author', constraints: false })
}

module.exports = { name, model, associations }
