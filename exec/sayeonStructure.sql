-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Database: sayeon
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE SCHEMA IF NOT EXISTS `sayeon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `sayeon` ;

--
-- Table structure for table `deletedstory`
--

DROP TABLE IF EXISTS `deletedstory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deletedstory` (
  `userId` varchar(100) NOT NULL,
  `storyId` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`,`storyId`),
  KEY `FK_sentStory_TO_deletedStory_1` (`storyId`),
  CONSTRAINT `FK_sentStory_TO_deletedStory_1` FOREIGN KEY (`storyId`) REFERENCES `sentstory` (`storyId`),
  CONSTRAINT `FK_user_TO_deletedStory_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receivedstory`
--

DROP TABLE IF EXISTS `receivedstory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receivedstory` (
  `storyId` varchar(100) NOT NULL,
  `receiverId` varchar(100) NOT NULL,
  `dateReceived` datetime NOT NULL,
  PRIMARY KEY (`storyId`),
  KEY `FK_user_TO_receiverstory_idx` (`receiverId`),
  CONSTRAINT `FK_sentStory_TO_receivedStory_1` FOREIGN KEY (`storyId`) REFERENCES `sentstory` (`storyId`),
  CONSTRAINT `FK_user_TO_receiverstory` FOREIGN KEY (`receiverId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `reportId` int NOT NULL AUTO_INCREMENT,
  `storyId` varchar(100) DEFAULT NULL,
  `userId` varchar(100) NOT NULL,
  `targetId` varchar(100) DEFAULT NULL,
  `reportDate` datetime NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `FK_sentStory_TO_report_1` (`storyId`),
  KEY `FK_user_TO_report_1` (`userId`),
  KEY `FK_user_To_targetId_idx` (`targetId`),
  CONSTRAINT `FK_sentStory_TO_report_1` FOREIGN KEY (`storyId`) REFERENCES `sentstory` (`storyId`),
  CONSTRAINT `FK_user_TO_report_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `FK_user_To_targetId` FOREIGN KEY (`targetId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `userId` varchar(100) NOT NULL,
  `requestType` varchar(100) NOT NULL,
  `requestedId` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`,`requestType`,`requestedId`),
  KEY `FK_user_TO_requestedId_idx` (`requestedId`),
  CONSTRAINT `FK_user_TO_request_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `FK_user_TO_requestedId` FOREIGN KEY (`requestedId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `selectedkeyword`
--

DROP TABLE IF EXISTS `selectedkeyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selectedkeyword` (
  `storyId` varchar(100) NOT NULL,
  `keyword` varchar(1000) NOT NULL COMMENT 'json으로 삽입',
  PRIMARY KEY (`storyId`),
  KEY `FK_sentStory_TO_selectedKeyword_1` (`storyId`),
  CONSTRAINT `FK_sentStory_TO_selectedKeyword_1` FOREIGN KEY (`storyId`) REFERENCES `sentstory` (`storyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sentstory`
--

DROP TABLE IF EXISTS `sentstory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentstory` (
  `storyId` varchar(100) NOT NULL,
  `senderId` varchar(100) NOT NULL,
  `waitingId` int DEFAULT NULL,
  `dateSent` datetime NOT NULL,
  `image` varchar(300) NOT NULL,
  `imageType` varchar(100) NOT NULL,
  PRIMARY KEY (`storyId`),
  KEY `FK_user_TO_sentStory_1` (`senderId`),
  KEY `FK_waitingTime_TO_sentStory_1` (`waitingId`),
  CONSTRAINT `FK_user_TO_sentStory_1` FOREIGN KEY (`senderId`) REFERENCES `user` (`userId`),
  CONSTRAINT `FK_waitingTime_TO_sentStory_1` FOREIGN KEY (`waitingId`) REFERENCES `waitingtime` (`waitingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `withdrawal` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofile` (
  `userId` varchar(100) NOT NULL,
  `profilePic` int NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `latitude` decimal(13,10) DEFAULT NULL,
  `longitude` decimal(13,10) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `FK_user_TO_userProfile_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waitingtime`
--

DROP TABLE IF EXISTS `waitingtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waitingtime` (
  `waitingId` int NOT NULL AUTO_INCREMENT,
  `waitingTime` float NOT NULL,
  `waitingName` varchar(20) NOT NULL,
  PRIMARY KEY (`waitingId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitingtime`
--

LOCK TABLES `waitingtime` WRITE;
/*!40000 ALTER TABLE `waitingtime` DISABLE KEYS */;
INSERT INTO `waitingtime` VALUES (1,2,'pigeon'),(2,1.5,'post'),(3,0.5,'bike');
/*!40000 ALTER TABLE `waitingtime` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-05 10:22:25
