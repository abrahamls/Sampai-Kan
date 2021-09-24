'use strict';
var bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.Item, {foreignKey:"ItemId"})
    }
  };
  Driver.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{msg:'Nama lengkap kosong, tolong diisi!'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{msg:'Email kosong, tolong diisi!'},
        isEmail:{msg:'Tulis email dengan benar'}
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Nomor Telepon kosong, tolong Diisi!'},
        isPhone(value){
          let zeroNum = value.slice(0,1)
          let plusNum = value.slice(0,3)
          if( zeroNum === '0') {
            throw new Error('Tidak perlu menggunakan prefix 0 didepan nomer telepon')
          } else if ( plusNum === '+62' ) {
            throw new Error('Tidak perlu menggunakan prefix +62 didepan nomer telepon')
          }
        }
      }
    },
    ItemId: DataTypes.INTEGER,
    profileUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://image.freepik.com/free-vector/modern-anonymous-concept-with-flat-design_23-2147887811.jpg"
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty:{msg:'Password kosong, tolong isi!'},
        passLength(value){
          if(value.length < 6) {
            throw new Error('Minimal karakter password adalah 6')
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};