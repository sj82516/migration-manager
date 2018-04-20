const path = require("path");
const Sequelize = require (path.join(__dirname,'../node_modules','sequelize'));

// @param {Object} queryInterface : method please consult http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html
// @param {Object} transaction : Sequelize transaction. You have to wrap transaction into all your statement for the data integrity.
async function update (queryInterface, transaction) {
  await queryInterface.createTable ('test-js', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attr1: Sequelize.STRING,
    attr2: Sequelize.INTEGER,
    attr3: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
      transaction
  });

  await queryInterface.changeColumn (
    'test-js',
    'attr1',
    {
        type: Sequelize.INTEGER
    },
    {
      transaction,
    }
  );
}

module.exports = update;
