/** Name of model */
const name = 'Post'

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
    status: {
      type: DataTypes.ENUM,
      values: ['deleted', 'draft', 'pending', 'published', 'inherit']
    },
    type: {
      type: DataTypes.ENUM,
      values: ['post', 'revision']
    },
    path: DataTypes.STRING,
    slug: DataTypes.STRING,
    featured: {
      type: DataTypes.ENUM,
      values: ['true', 'false', 'inherit']
    },

    /** Content */
    dek: DataTypes.TEXT,
    body: DataTypes.TEXT,

    /** Temporary */
    media: DataTypes.JSON
  })
}

/** Model associations */
const associations = (models) => {
  /** Revisions */
  models.Post.hasMany(models.Post, { as: 'Revisions', foreignKey: 'ParentId', constraints: false })
  /** Parent post (for revisions) */
  models.Post.belongsTo(models.Post, { as: 'Parent', constraints: false })

  /** Authors */
  models.Post.belongsToMany(models.User, { as: 'Authors', through: 'PostAuthors', constraints: false })
  /** Collections */
  models.Post.belongsToMany(models.Collection, { as: 'Collections', through: 'PostCollections' })
  /** Featured Image */
  models.Post.belongsTo(models.Media, { as: 'FeaturedImage' })

  /** Comments */
  models.Post.hasMany(models.Comment, { as: 'Comments' })
}

module.exports = { name, model, associations }
