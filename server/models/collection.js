/** Name of model */
const name = 'Collection'

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
      values: ['open', 'closed'],
      defaultValue: 'open'
    },
    type: {
      type: DataTypes.ENUM,
      values: ['category', 'contest'],
      defaultValue: 'category'
    },
    slug: DataTypes.STRING,
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: DataTypes.TEXT
  })
}

/** Model associations */
const associations = (models) => {
  /** Parent category */
  models.Collection.belongsTo(models.Collection, { as: 'Parent', foreignKey: 'ParentCategoryId', constraints: false })
  /** Child categories */
  models.Collection.hasMany(models.Collection, { as: 'ChildCategories', foreignKey: 'ParentCategoryId', constraints: false })

  /** Authors */
  models.Collection.belongsToMany(models.User, { as: 'Authors', through: 'CollectionAuthors', constraints: false })
  /** Featured Image */
  models.Collection.belongsTo(models.Media, { as: 'FeaturedImage', constraints: false })

  /** Posts */
  models.Collection.belongsToMany(models.Post, { as: 'Post', through: 'PostCollections', constraints: false })
}

module.exports = { name, model, associations }
