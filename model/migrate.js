const Sequelize = require ('sequelize');
const sequelize = require ('../connection');

class Migration {
  constructor () {
    this._model = sequelize.define (
      'migration',
      {
        uid: {
          type: Sequelize.STRING (255),
          primaryKey: true,
        },
      },
      {
        freezeTableName: true,
      }
    );
  }

  async fetchAll () {
    return this._model.findAll ({
      attributes: ['uid'],
    });
  }

  // @Params record: (Array[String]) 要新增的紀錄，例如 ["123" , "222"]
  async insertRecord (recordList, transaction) {
    return this._model.bulkCreate (
      recordList.map (r => {
        return {
          uid: r,
        };
      }, {
        transaction
      })
    );
  }
}

module.exports = Migration;
