-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sayeon
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sayeon
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sayeon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `sayeon` ;

-- -----------------------------------------------------
-- Table `sayeon`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`user` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`user` (
  `userId` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`waitingtime`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`waitingtime` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`waitingtime` (
  `waitingId` INT NOT NULL AUTO_INCREMENT,
  `waitingTime` FLOAT NOT NULL,
  `waitingName` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`waitingId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`sentstory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`sentstory` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`sentstory` (
  `storyId` VARCHAR(100) NOT NULL,
  `senderId` VARCHAR(100) NOT NULL,
  `waitingId` INT NULL,
  `dateSent` DATETIME NOT NULL,
  `image` VARCHAR(300) NOT NULL,
  `imageType` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`storyId`),
  INDEX `FK_user_TO_sentStory_1` (`senderId` ASC) VISIBLE,
  INDEX `FK_waitingTime_TO_sentStory_1` (`waitingId` ASC) VISIBLE,
  CONSTRAINT `FK_user_TO_sentStory_1`
    FOREIGN KEY (`senderId`)
    REFERENCES `sayeon`.`user` (`userId`),
  CONSTRAINT `FK_waitingTime_TO_sentStory_1`
    FOREIGN KEY (`waitingId`)
    REFERENCES `sayeon`.`waitingtime` (`waitingId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`deletedstory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`deletedstory` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`deletedstory` (
  `userId` VARCHAR(100) NOT NULL,
  `storyId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`, `storyId`),
  INDEX `FK_sentStory_TO_deletedStory_1` (`storyId` ASC) VISIBLE,
  CONSTRAINT `FK_sentStory_TO_deletedStory_1`
    FOREIGN KEY (`storyId`)
    REFERENCES `sayeon`.`sentstory` (`storyId`),
  CONSTRAINT `FK_user_TO_deletedStory_1`
    FOREIGN KEY (`userId`)
    REFERENCES `sayeon`.`user` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`receivedstory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`receivedstory` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`receivedstory` (
  `storyId` VARCHAR(100) NOT NULL,
  `receiverId` VARCHAR(100) NOT NULL,
  `dateReceived` DATETIME NOT NULL,
  PRIMARY KEY (`storyId`),
  INDEX `FK_user_TO_receiverstory_idx` (`receiverId` ASC) VISIBLE,
  CONSTRAINT `FK_sentStory_TO_receivedStory_1`
    FOREIGN KEY (`storyId`)
    REFERENCES `sayeon`.`sentstory` (`storyId`),
  CONSTRAINT `FK_user_TO_receiverstory`
    FOREIGN KEY (`receiverId`)
    REFERENCES `sayeon`.`user` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`report` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`report` (
  `reportId` INT NOT NULL AUTO_INCREMENT,
  `storyId` VARCHAR(100) NULL DEFAULT NULL,
  `userId` VARCHAR(100) NOT NULL,
  `targetId` VARCHAR(100) NULL DEFAULT NULL,
  `reportDate` DATETIME NOT NULL,
  PRIMARY KEY (`reportId`),
  INDEX `FK_sentStory_TO_report_1` (`storyId` ASC) VISIBLE,
  INDEX `FK_user_TO_report_1` (`userId` ASC) VISIBLE,
  INDEX `FK_user_To_targetId_idx` (`targetId` ASC) VISIBLE,
  CONSTRAINT `FK_sentStory_TO_report_1`
    FOREIGN KEY (`storyId`)
    REFERENCES `sayeon`.`sentstory` (`storyId`),
  CONSTRAINT `FK_user_TO_report_1`
    FOREIGN KEY (`userId`)
    REFERENCES `sayeon`.`user` (`userId`),
  CONSTRAINT `FK_user_To_targetId`
    FOREIGN KEY (`targetId`)
    REFERENCES `sayeon`.`user` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`requesttype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`requesttype` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`requesttype` (
  `requestId` INT NOT NULL,
  `typeName` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`requestId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`request` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`request` (
  `userId` VARCHAR(100) NOT NULL,
  `requestId` INT NOT NULL,
  `requestedId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`, `requestId`, `requestedId`),
  INDEX `FK_requestType_TO_request_1` (`requestId` ASC) VISIBLE,
  INDEX `FK_user_TO_requestedId_idx` (`requestedId` ASC) VISIBLE,
  CONSTRAINT `FK_requestType_TO_request_1`
    FOREIGN KEY (`requestId`)
    REFERENCES `sayeon`.`requesttype` (`requestId`),
  CONSTRAINT `FK_user_TO_request_1`
    FOREIGN KEY (`userId`)
    REFERENCES `sayeon`.`user` (`userId`),
  CONSTRAINT `FK_user_TO_requestedId`
    FOREIGN KEY (`requestedId`)
    REFERENCES `sayeon`.`user` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`selectedkeyword`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`selectedkeyword` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`selectedkeyword` (
  `storyId` VARCHAR(100) NOT NULL,
  `keyword` BLOB NOT NULL COMMENT 'json으로 삽입',
  PRIMARY KEY (`storyId`),
  INDEX `FK_sentStory_TO_selectedKeyword_1` (`storyId` ASC) VISIBLE,
  CONSTRAINT `FK_sentStory_TO_selectedKeyword_1`
    FOREIGN KEY (`storyId`)
    REFERENCES `sayeon`.`sentstory` (`storyId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sayeon`.`userprofile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sayeon`.`userprofile` ;

CREATE TABLE IF NOT EXISTS `sayeon`.`userprofile` (
  `userId` VARCHAR(100) NOT NULL,
  `profilePic` INT NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `FK_user_TO_userProfile_1`
    FOREIGN KEY (`userId`)
    REFERENCES `sayeon`.`user` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
