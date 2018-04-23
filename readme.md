## migration-manager
This is a migration manager base on sequelize.  
It is not **auto diff generated** migration tool which I am looking for but can't find.  
This package only do two things.  
1. auto generate "migrate"-{{Date}}-{{RandomString}} file.
2. Execute migration file created on step 1 and record on table `migration` inside database.  

Only support mysql now.

## How to use
You have to install nodejs at least 8 which native support async/await.
 `> npm install -g migration-manager`   

Inside your project, you have to create `./config/config.json` and `./migrations`.  
`./config/config.json` is Sequelize configuration format( option attributes please consult [sequelizejs doc](http://docs.sequelizejs.com/manual/installation/usage.html#options)). You can consult this repo for example.  
`./migrations` folder would store all migration files. Currently doesn't support custom path.  

Then execute migration-manager inside your project. The path matters.  
`> migration-manager a <type>` would copy template based on type. Currently support `sql` which you can write multi raw queries and `js` which support Sequelize migration file format(slightly different).  
![Imgur](https://i.imgur.com/Y0kSbT5.jpg)  

`> migration-manager e `  to execute migrations. All migrations would be wrapped into one big transactions for data integrity!    
After successfully executed, the migrations file would be record inside db table `migration` to avoid repeat execution. 
![Imgur](https://i.imgur.com/FY6mxyX.jpg)  
![Imgur](https://i.imgur.com/Zw35mDd.jpg)

## Test
Using docker as test environments tool.
You have to install docker first and run `docker run --name my-
mysql -e MYSQL_ROOT_PASSWORD=my-password -d -p 3306:3306 mysql` to start mysql locally.  

Then run 
```
> docker build test .
> docker run --link my-mysql:mysql --rm test ./test/test.sh
```

## TODO
~~1. Add fully test.~~  
2. Support other db, at least compat all Sequelize support list.