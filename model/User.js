const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../sql/connection");

class User extends Model {
  otherPublicField;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pen_name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "User",
    sequelize,
  }
);

sequelize.sync()
  .then(() => {
    console.log(`Table telah ditambahkan`);
  })
  .catch((error) => {
    console.log(`Table gagal ditambahkan, error: ${error}`);
  });

createUser = async (i_name, i_pen_name, i_age, i_address) => {
  const user = await User.create({
    name: i_name,
    pen_name: i_pen_name,
    age: i_age,
    address: i_address,
  });
  return user;
};

getUser = async () => {
  const user = await User.findAll();
  return user;
}

getById = async (id) => {
  const user = await User.findAll({
    where: {
      id: id
    }
  });

  return user;
}

updateUser = async (id, param) => {
  const user = await User.update({
    name: param.name,
    pen_name: param.pen_name,
    age: param.age,
    address: param.address
  }, {
    where: {
      id: id
    }
  });

  return user;
}

deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id: id
    }
  });

  return user;
}

module.exports = {
  createUser,
  getUser,
  getById,
  updateUser,
  deleteUser
};
