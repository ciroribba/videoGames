const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'It requires a valid name',
        },
      },
    },
    background_image:{
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'It requires a valid name',
        },
      },
    },
    released: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.ENUM({
        values: ["PC", "PlayStation", "Xbox", "Nintendo", "iOS", "Android", "macOS", "Linux", "PSP", 
        "Wii", "GameCube", "Game Boy", "SNES", "NES", "Apple", "Commodore", "Atari",  "SEGA"]
      })),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'platforms are required',
        }
      },
    }
  }, 
  {timestamps: false}
  );
};
