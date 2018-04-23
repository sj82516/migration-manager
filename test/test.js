const {expect} = require ('chai');
const fs = require('mz/fs');
const path = require('path');
const sequelize = require('../connection');

describe ('Gen file', function () {
  it ('check auto gen files', async function () {
    let folderPath = path.join(process.cwd(), "./migrations");
    let fileList = await fs.readdir(folderPath);

    // 2 auto gen and 4 copy.
    expect(fileList.length).to.equal(6);

    for(let f of fileList){
        let type = /^migrate-([0-9]+)-([a-f0-9]+).([a-z]*)$/.exec(f)[3];
        expect(type).to.be.oneOf(['sql', 'js']);
    }
  });
});

describe ('Migration', function () {
  it ('check data after migration.', async function () {
    let tableList = await sequelize.query(`
        SHOW TABLES;
    `);
    tableList = tableList[0];
    let testSQLTableInfo = await sequelize.query(`
        DESCRIBE ${"`test-sql`"};
    `);
    testSQLTableInfo = testSQLTableInfo[0];

    let allTableList = ['migration', 'test-js', 'test-sql', 'test-js-2', 'test-sql-2'];
    for(let t of tableList){
        expect(t['Tables_in_test']).to.be.oneOf(allTableList);
    }

    // Compare field name and type.
    let testSQLFieldList = {
        'id': 'int(10) unsigned',
        'i': 'int(11)',
        'attr2': 'varchar(40)',
        'attr3': 'tinyint(1)',
        'createAt': 'date'
    }
    for(let f of testSQLTableInfo){
        expect(testSQLFieldList[f.Field]).to.not.be.undefined;
        expect(testSQLFieldList[f.Field]).to.equal(f.Type);
    }
  });
});

after(() => setTimeout(() => process.exit(), 1000))