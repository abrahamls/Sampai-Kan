'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasOne(models.Driver, {foreignKey:'ItemId'})
      Item.belongsTo(models.Customer, {foreignKey:'CustomerId'})
      Item.belongsTo(models.Category, {foreignKey: 'CategoryId'})
    }

    static getAll(Category, search) {
      let options = {
        where: {},
        include: [Category] 
      }
  
      if(search) {
        options.where.name = {[Op.iLike]: `%${search}%`}
      }

      return Item.findAll(options)
    }
  };
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};