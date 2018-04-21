const crypto = require ('crypto');
const moment = require ('moment');
const fs = require ('mz/fs');
const path = require ('path');

const model = require ('./model');
const sequelize = require ('./connection');


const fileTypeSupportList = ['js', 'sql'];

// create template file to migration folder
// @param {string} type - copy template file. currently support js / sql
// @return {Promise}
async function createMigrationFile (type) {
  // default is sql
  if (fileTypeSupportList.indexOf (type) == -1) {
    type = 'sql';
  }

  let fileName =
    'migrate-' +
    moment ().format ('YYYYMMDDHHmm') +
    '-' +
    crypto.randomBytes (16).toString ('hex').slice(16) +
    '.' +
    type;

    await fs.copyFile (
    path.join (__filename, '../template', `${type}_template.${type}`),
    path.join (global.MIGRATION_FOLDER_PATH, fileName)
  );

  console.log("create migration file success.");
}

exports.createMigrationFile = createMigrationFile;

async function migration(){
  let migrationFileList = await fs.readdir(global.MIGRATION_FOLDER_PATH);
  let migrationFileListDB = await model.fetchAll();
  migrationFileListDB = migrationFileListDB.map(m => m.uid);

  let diffMigrationList = migrationFileList.filter(mF => migrationFileListDB.indexOf(mF) == -1);

  if(!diffMigrationList || diffMigrationList.length == 0){
    return console.log("Nothing to migrate.");
  }

  console.log("start migrate");
  let transaction = await sequelize.transaction();
  try{
    for(let f of diffMigrationList){
      console.log(`start to migrate ${f}`);
      let migrateFilePath = path.join(global.MIGRATION_FOLDER_PATH, f);
      
      if(f.slice(-3) == ".js"){
        let m = require(migrateFilePath);
        await m(sequelize.queryInterface, transaction);
      }else{
        let sql = await fs.readFile(migrateFilePath, 'utf8');
        await sequelize.query(sql, {
          transaction
        });
      }

      console.log(`finish ${diffMigrationList}`);
    }
    console.log("migration finished. Writing record to database.");

    await model.insertRecord(diffMigrationList, transaction);
    await transaction.commit();
    console.log("migration successed!");
  }catch(error){
    console.log("migration error:", error);
    await transaction.rollback();
  }
}

exports.migration = migration;
