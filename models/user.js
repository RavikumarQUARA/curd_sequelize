'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post}) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })  
    }

    toJSON(){
      return {...this.get(), id: undefined }
    }
    
  }
  // create models in sequlize

  User.init({
    uuid: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name cannot be null' }
      },
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email cannot be null' },
        isEmail: { msg: 'email must be a valid email' }
      },
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: { msg: 'User must have a role' },
        notEmpty: { msg: 'role cannot be null' }

      },
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};