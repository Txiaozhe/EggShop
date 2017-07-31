CREATE TABLE IF NOT EXISTS `user` (
    `id` INT AUTO_INCREMENT,
    `nickname` TEXT NOT NULL,
    `mobile` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    PRIMARY KEY ( `id` )
);

CREATE TABLE IF NOT EXISTS `userinfo` (
    `id` INT NOT NULL,
    `nickname` TEXT NOT NULL,
    `age` INT UNSIGNED,
    `mobile` TEXT NOT NULL,
    `email` TEXT,
    `address` TEXT,
    PRIMARY KEY ( `id` )
);
