const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris.'
        },
        validate: {
          notEmpty: { msg: 'Vous devez indiquer le nom du pokemon.' },
          notNull: { msg: "Le nom d'un pokemon est une propritété requise" }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'Les points de vie sont une propriété requise.' },
          max: {
            args: [999],
            msg: "Cette chaine de caractères doit contenir 999 points maximum."
          },
          min: {
            args: [0],
            msg: "Cette chaine de caractères doit contenir 0 points minimum."
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'Les points de vie sont une propriété requise.' },
          max: {
            args: [99],
            msg: "Cette chaine de caractères doit contenir 99 points maximum."
          },
          min: {
            args: [0],
            msg: "Cette chaine de caractères doit contenir 0 points minimum."
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Vous devez passer un url." },
          notNull: { msg: "L'URL est une propriété requise." }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join()) 
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokemon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokemon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
              } 
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }