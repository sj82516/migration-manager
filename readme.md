## migration-manager
This is a migration manager base on sequelize.  
It is not **auto diff generated** migration tool which I am looking for but can't find.  
This package only do two things.  
1. auto generate "migrate"-{{Date}}-{{RandomString}} file.
2. Execute migration file created on step 1 and record on table `migration` inside database.  

Only support mysql now.

## How to use
 `> npm install -g migration-manager`   

Inside your project, you have to create `./config/config.json` and `./migrations`.  
`./config/config.json` is Sequelize configuration format. You can consult this repo for example.  
`./migrations` folder would store all migration files. Currently doesn't support custom path.  

Then execute migration-manager inside your project. The path matters.  
`> migration-manager a <type>` would copy template based on type. Currently support `sql` which you can write multi raw queries and `js` which support Sequelize migration file format(slightly different).  

`> migration-manager e `  to execute migrations. All migrations would be wrapped into one big transactions for data integrity!    
After successfully executed, the migrations file would be record inside db to avoid repeat execution. 

## TODO
1. Add fully test.
2. Support other db, at least compat all Sequelize support list.