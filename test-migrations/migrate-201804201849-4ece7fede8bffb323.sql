-- Create multi sql statements as you want
CREATE TABLE IF NOT EXISTS `test-sql-2`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `attr1` VARCHAR(100) NOT NULL,
   `attr2` VARCHAR(40) NOT NULL,
   `attr3` BOOLEAN,
   `createAt` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8; 

INSERT INTO `test-sql-2` 
    (attr1, attr2, attr3)
    VALUES
    ("hello word", "world hello", true);

