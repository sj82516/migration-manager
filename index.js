#!/usr/bin/env node

const path = require ('path');
const program = require ('commander');

const sequelize = require ('./connection');
const util = require ('./util');

async function main () {
  await sequelize.sync ();

  global.MIGRATION_FOLDER_PATH = path.join (__dirname, 'migrations');

  program.version ('0.0.1').description ('Contact management system');

  program
    .command ('add <type>')
    .alias ('a')
    .description (
      'Create migration file from template. Currently support .js(written in sequelize) || .sql(raw sql)'
    )
    .action (async type => {
      await closeConnectionWrapper (
        util.createMigrationFile.bind (this, type)
      );
    });

  program
    .command ('exec')
    .alias ('e')
    .description ('Execute migration.')
    .action (async _ => {
      await closeConnectionWrapper (util.migration);
    });

  program.command ('*').action (async _ => {
    console.log("Instruction miss.");
    await sequelize.close ();
  });

  program.parse (process.argv);
}

// Have to manually close sequelize connection to stop the command.
async function closeConnectionWrapper (fn) {
  try {
    await fn ();
    await sequelize.close ();
  } catch (error) {
    console.error ('error:', error);
    await sequelize.close ();
  }
}

main ();
