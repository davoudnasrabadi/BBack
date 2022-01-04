-- CreateTable
CREATE TABLE `token` (
    `token_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(1023) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expired_at` DATETIME(3),

    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255),
    `email_verified` BOOLEAN,
    `phone` VARCHAR(32),
    `google_id` VARCHAR(30),
    `password` VARCHAR(255),
    `address` VARCHAR(255),
    `avatar` VARCHAR(255),
    `display_name` VARCHAR(255),
    `name` VARCHAR(255),
    `family` VARCHAR(255),
    `last_signin` DATETIME(0),
    `created_at` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),
    `temp_token` VARCHAR(191),
    `amount` DOUBLE DEFAULT 0,
    `verified` BOOLEAN NOT NULL,
    `project_id` INTEGER NOT NULL,
    `postalCode` INTEGER,
    `city` VARCHAR(191),
    `gender` VARCHAR(191),
    `bday` INTEGER,
    `bmonth` INTEGER,
    `byear` INTEGER,
    `country` VARCHAR(191),
    `role` VARCHAR(191),
    `pauseAllNotif` BOOLEAN,
    `inGameNotif` BOOLEAN,
    `emailNotif` BOOLEAN,
    `smsNotif` BOOLEAN,
    `totalPlayed` INTEGER,
    `numberOfCups` INTEGER,
    `totalCoins` INTEGER,
    `countryPlacement` INTEGER,
    `worldPlacement` INTEGER,
    `numberOfWinds` INTEGER,
    `totalEarnedFrames` INTEGER,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_active_session` (
    `jti` VARCHAR(33) NOT NULL,
    `expired_at` TIMESTAMP NOT NULL,
    `user_id` INTEGER UNSIGNED,
    `authorized_app_id` INTEGER UNSIGNED,
    `ip` VARCHAR(50),
    `created_at` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),

    PRIMARY KEY (`jti`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShoppingCard` (
    `row_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `name` VARCHAR(191),
    `createdBy` VARCHAR(191),
    `contract_add` VARCHAR(191),
    `token_id` INTEGER,
    `pieces` INTEGER,
    `price` INTEGER,

    PRIMARY KEY (`row_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_device` (
    `device_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `browser_name` VARCHAR(40),
    `browser_ver` VARCHAR(40),
    `device_model` VARCHAR(40),
    `device_type` VARCHAR(40),
    `device_vendor` VARCHAR(40),
    `os_name` VARCHAR(40),
    `os_ver` VARCHAR(40),
    `cpu` VARCHAR(40),
    `jti` VARCHAR(33) NOT NULL,

    UNIQUE INDEX `session_device.jti_unique`(`jti`),
    PRIMARY KEY (`device_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `otp_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(40) NOT NULL,
    `project_id` INTEGER,
    `type` INTEGER NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `expire_at` TIMESTAMP(0) NOT NULL,
    `verified` BOOLEAN,

    UNIQUE INDEX `otp.email_unique`(`email`),
    PRIMARY KEY (`otp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `game_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `game_name` VARCHAR(50) NOT NULL,
    `type` ENUM('WEEK_FINAL', 'MONTH_FINAL', 'SUPER_CUP', 'CUP'),
    `time` DATETIME(3),
    `img_path` VARCHAR(191),
    `running` BOOLEAN,
    `xdim` INTEGER,
    `ydim` INTEGER,

    PRIMARY KEY (`game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `ticket_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `plan` VARCHAR(191) NOT NULL,
    `gameType` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketUser` (
    `row_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `ticket_id` INTEGER NOT NULL,
    `paid` BOOLEAN,

    PRIMARY KEY (`row_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameDate` (
    `row_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`row_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competitions` (
    `user_id` INTEGER NOT NULL,
    `game_id` INTEGER NOT NULL,
    `wins` BOOLEAN NOT NULL,

    UNIQUE INDEX `usergame`(`user_id`, `game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `trans_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `trans_type` ENUM('PAYMENT') NOT NULL,
    `val` VARCHAR(32),
    `succ` BOOLEAN NOT NULL,

    PRIMARY KEY (`trans_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Board` (
    `row_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `game_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,

    PRIMARY KEY (`row_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Puzzle` (
    `user_id` INTEGER NOT NULL,
    `game_name` VARCHAR(191) NOT NULL,
    `x` INTEGER NOT NULL,
    `y` INTEGER NOT NULL,
    `isEdge` BOOLEAN NOT NULL,
    `x_loc` INTEGER NOT NULL,
    `y_loc` INTEGER NOT NULL,

    UNIQUE INDEX `puzzlerow`(`user_id`, `game_name`, `x`, `y`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameBoard` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `market` VARCHAR(191),
    `type` VARCHAR(191),
    `file_name` VARCHAR(191),
    `author` VARCHAR(191),
    `contract_add` VARCHAR(191),
    `token_id` INTEGER,
    `pieces` INTEGER,
    `price` INTEGER,
    `owner` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `row_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount` DOUBLE NOT NULL,
    `variety` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`row_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `file_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `game_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mime` VARCHAR(191),
    `size` INTEGER UNSIGNED,
    `path` VARCHAR(191) NOT NULL,
    `gameGame_id` INTEGER UNSIGNED,

    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `msg_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `msg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`msg_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_active_session` ADD FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session_device` ADD FOREIGN KEY (`jti`) REFERENCES `user_active_session`(`jti`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD FOREIGN KEY (`gameGame_id`) REFERENCES `Game`(`game_id`) ON DELETE SET NULL ON UPDATE CASCADE;
