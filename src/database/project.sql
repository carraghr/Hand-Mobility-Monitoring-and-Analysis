-- MySQL dump 10.16  Distrib 10.1.16-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	10.1.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `project`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `project` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `project`;

--
-- Table structure for table `careprovider`
--

DROP TABLE IF EXISTS `careprovider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `careprovider` (
  `NameFirst` varchar(15) NOT NULL,
  `NameLast` varchar(20) NOT NULL,
  `StaffID` varchar(10) NOT NULL,
  `Level` varchar(3) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Pass` varchar(118) DEFAULT NULL,
  `Salt` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`StaffID`),
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `careprovider`
--

LOCK TABLES `careprovider` WRITE;
/*!40000 ALTER TABLE `careprovider` DISABLE KEYS */;
INSERT INTO `careprovider` VALUES ('Richard','Carragher','12328961','pro','carraghr','$6$rounds=5000$046fb6279037e1fc$/MBrItD6IuhZKuJAaUyUJjypF.BHQfxUiIya7Z//50UJY56A6YZsR8eS9nJV3u47xTVK2N7bDGnLYGlfR20st.','$6$rounds=5000$046fb6279037e1fc55524e6e1114d9a1$'),('mark','Duck','1235334','sho','markDuc','$6$rounds=5000$bc02cecb36b89685$YXYtRWjCMZ0pzMqggWrySRj7g0f5l4Rqe5Ob5R9IvA8On9.GX8vRsPiffhXH4xJsyeAvfmyBcKFTB79TUqxlP/','$6$rounds=5000$bc02cecb36b89685aef4e86bb0972329$'),('Eoin','Edwards','1235361','sho','ownED','$6$rounds=5000$27038c8d1222fe5d$vkh86RteaWyZhkyqlrL6XFB.5y08TOMT22eP/xipjTdgiVl4mP8Se4a9mTHtdC7k7VcrHHPbEbiWD8gwEuqcc1','$6$rounds=5000$27038c8d1222fe5d749aec3b08493e2f$'),('John','Smite','12354351','sho','jsmite','$6$rounds=5000$a3a36e0863c46302$c7ryXq9e3MMKkDcx5/usSnxbyqCfLw3ZpH5gp0jyAeP.cwQPPDHF26ae2457VZEUR9HTm.gxiwAOlsWx2HzWe/','$6$rounds=5000$a3a36e0863c463021b283738e9f0d686$'),('Tom','Tomus','12356541','pro','tomtom','$6$rounds=5000$2e6331636c427c2a$1MVnBvr7lhfdc0zCCQyruzHRBGAizOvF3axlHq0WstNsA5aA61G4xDgGXh43KyVSlyUMl7Zz5LBadOXw1hu4y1','$6$rounds=5000$2e6331636c427c2a122be669ee67c837$'),('Joe','Smith','125234901','sho','joejoe','$6$rounds=5000$ee89b5009e324815$glOCLW/IMpeIU9se.XD748xV5Q0C1kk3ONH/SttLhqNu/YS6mWRO5WPav5pV0rz/CoydJqF0Tmk8yvK25BHrt1','$6$rounds=5000$ee89b5009e324815eb6fdcf218ceec5e$'),('Brain','Water','13454563','sho','brater','$6$rounds=5000$af0c917820ebfd3a$0Xx6KZ0goq35B8usmQZJV.o9H/n9P4cH5whOEFA3BdDVrDCixjZ15jfYTdbVmEAj42G0yBuCM8lckxbN.CLlI1','$6$rounds=5000$af0c917820ebfd3a8f92796b05a7ce66$'),('Sarah','Clark','34531374','sho','sclark','$6$rounds=5000$06d46abb468cd85f$/X83KP5Tq3U0eEqIdbAkBGkACH0z2DVyNlIDGAsCX.BA45j.lxu1q8ocKi.s64YzhlTIBWSJhUjM6DjYpigGd0','$6$rounds=5000$06d46abb468cd85f6ab74efde8c3e9ea$'),('Conor','McGee','35354366','sho','convoy','$6$rounds=5000$59f9320a00ccc8e1$NBQyo5yIeF8vZbjiGDoHp2LGNThOcOO22MW9vlXNDXQ75uxVyv3HpwGsdFCR8Bj99SF7rznW1WarasIPnNUKa1','$6$rounds=5000$59f9320a00ccc8e1bb2278a047e33bf8$'),('George','Monkey','3653654','sho','chris','$6$rounds=5000$ce171bd8c6e0ad46$yB4Q4MTiNpRZa.KhF5zRw3z3.gZPHR1lWqBBZCgSNnoN16PpqKBxn.AaF79r5vJ2.YAVnLEarn2s1nuTwp7z..','$6$rounds=5000$ce171bd8c6e0ad46f022c7220108e21b$'),('Jessica','Ford','42413485','pro','hlihmnklh','$6$rounds=5000$64e24ae9b2a7e54f$feJd2m0nKTAJjrjpUBYBhSaWfmV872vkZcDbafG5.wB2YJ4CaxdNbs7s.3.A49mFRysZEF.qMNNOP8yoKIc3y1','$6$rounds=5000$64e24ae9b2a7e54f79712d59a4d3bb4b$');
/*!40000 ALTER TABLE `careprovider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `Name` varchar(25) NOT NULL,
  `Area` varchar(10) NOT NULL,
  `MeasurementUnit` varchar(10) NOT NULL,
  `Desctiption` tinytext NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES ('1','Hand','centimeter','some text'),('2','Hand','centimeter','some text'),('3','Hand','centimeter','some text'),('4','Hand','centimeter','some text'),('5','Hand','centimeter','some text'),('6','Hand','centimeter','some text'),('7','Hand','centimeter','some text'),('8','Hand','centimeter','some text'),('Finger Separating','Hand','degrees','some text'),('Tip to Tip','Hand','centimeter','some text'),('Wave','Wrist','degrees','some text');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `PID` varchar(10) NOT NULL,
  `DOF` datetime NOT NULL,
  `Comment` text NOT NULL,
  PRIMARY KEY (`PID`,`DOF`),
  CONSTRAINT `PatientFeedbackFK` FOREIGN KEY (`PID`) REFERENCES `patient` (`PatientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES ('1232890','2017-01-20 18:11:53','Message One');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fingerseparationexercise`
--

DROP TABLE IF EXISTS `fingerseparationexercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fingerseparationexercise` (
  `PID` varchar(10) NOT NULL,
  `DOE` datetime NOT NULL,
  `Hand` varchar(5) NOT NULL,
  `Repetition` int(11) NOT NULL,
  `Sequence` int(11) NOT NULL,
  `Location` varchar(6) NOT NULL,
  `Minimum` decimal(4,2) NOT NULL,
  `Mean` decimal(4,2) NOT NULL,
  `Median` decimal(4,2) NOT NULL,
  `Maximum` decimal(4,2) NOT NULL,
  PRIMARY KEY (`PID`,`DOE`,`Repetition`,`Sequence`,`Location`),
  CONSTRAINT `PatientFingerSeparationFK_1` FOREIGN KEY (`PID`) REFERENCES `patient` (`PatientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fingerseparationexercise`
--

LOCK TABLES `fingerseparationexercise` WRITE;
/*!40000 ALTER TABLE `fingerseparationexercise` DISABLE KEYS */;
INSERT INTO `fingerseparationexercise` VALUES ('1232890','2017-01-20 21:58:40','right',1,1,'index',15.00,16.00,16.00,17.00),('1232890','2017-01-20 21:58:40','right',1,1,'middle',13.00,15.00,15.00,16.00),('1232890','2017-01-20 21:58:40','right',1,1,'ring',25.00,27.00,27.00,27.00),('1232890','2017-01-20 21:58:40','right',1,1,'thumb',32.00,38.00,39.00,41.00),('1232890','2017-01-20 21:58:40','right',2,1,'index',15.00,15.00,15.00,15.00),('1232890','2017-01-20 21:58:40','right',2,1,'middle',14.00,14.00,14.00,14.00),('1232890','2017-01-20 21:58:40','right',2,1,'ring',26.00,26.00,26.00,26.00),('1232890','2017-01-20 21:58:40','right',2,1,'thumb',43.00,44.00,44.00,46.00);
/*!40000 ALTER TABLE `fingerseparationexercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handexercisetargetlocations`
--

DROP TABLE IF EXISTS `handexercisetargetlocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handexercisetargetlocations` (
  `Exercise` varchar(25) NOT NULL,
  `Location` varchar(8) NOT NULL,
  PRIMARY KEY (`Exercise`,`Location`),
  CONSTRAINT `HandExerciseTargetLocation` FOREIGN KEY (`Exercise`) REFERENCES `exercises` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handexercisetargetlocations`
--

LOCK TABLES `handexercisetargetlocations` WRITE;
/*!40000 ALTER TABLE `handexercisetargetlocations` DISABLE KEYS */;
/*!40000 ALTER TABLE `handexercisetargetlocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handtargets`
--

DROP TABLE IF EXISTS `handtargets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handtargets` (
  `PID` varchar(10) NOT NULL,
  `Exercise` varchar(25) NOT NULL,
  `Hand` varchar(5) NOT NULL,
  `Location` varchar(8) NOT NULL,
  `Target` decimal(4,2) NOT NULL,
  `Repetition` int(11) NOT NULL,
  `Sequence` int(11) NOT NULL,
  PRIMARY KEY (`PID`,`Exercise`,`Hand`,`Location`),
  KEY `Exercise` (`Exercise`),
  CONSTRAINT `PatientHandTargetsFK_1` FOREIGN KEY (`PID`) REFERENCES `patient` (`PatientID`),
  CONSTRAINT `handtargets_ibfk_1` FOREIGN KEY (`Exercise`) REFERENCES `exercises` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handtargets`
--

LOCK TABLES `handtargets` WRITE;
/*!40000 ALTER TABLE `handtargets` DISABLE KEYS */;
INSERT INTO `handtargets` VALUES ('1232890','Finger Separating','right','index',2.00,2,1),('1232890','Finger Separating','right','middle',2.00,2,1),('1232890','Finger Separating','right','ring',2.00,2,1),('1232890','Finger Separating','right','thumb',2.00,2,1);
/*!40000 ALTER TABLE `handtargets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `NameFirst` varchar(15) NOT NULL,
  `NameLast` varchar(20) NOT NULL,
  `PatientID` varchar(10) NOT NULL,
  `CPID` varchar(10) NOT NULL,
  `DOB` date DEFAULT NULL,
  `UserName` varchar(20) NOT NULL,
  `Pass` varchar(118) DEFAULT NULL,
  `Salt` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`PatientID`),
  UNIQUE KEY `UserName` (`UserName`),
  KEY `PatientCareProviderFK_1` (`CPID`),
  CONSTRAINT `PatientCareProviderFK_1` FOREIGN KEY (`CPID`) REFERENCES `careprovider` (`StaffID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('p0f','p0l','1232890','12328961','0000-00-00','patient0','$6$rounds=5000$b6e1b01876394be9$4KV8acXcWSn4HvGZuZ7KUL2QA84Cubun1..OFAl2ADgpShvcVn8HLvGpzlBTnXiXZUlbs.5BQyz3XCJm4tXBz/','$6$rounds=5000$b6e1b01876394be95be0fff59f1aa69a$'),('p1f','p1l','1232891','12328961','0000-00-00','patient1','$6$rounds=5000$c875825de355e3f0$hOH7K3rBhFv76q6/xRzjDAjJ7OMgjML/3OpTTsCnkpzGg3aNLMvnBg.7Af2W4B1Ywez7X23pK3r982o.mDp2V0','$6$rounds=5000$c875825de355e3f03a60e7eee0d527dc$'),('p2f','p2l','1232892','12328961','0000-00-00','patient2','$6$rounds=5000$942cfbcb0511d9df$UHV4uFr88FAGxKn8K33xellysnPfDbYQSphbvvmtqK7OiaffACpLYM/pjnm.QggpOvfo2zCQLamH8mHSoBUpJ.','$6$rounds=5000$942cfbcb0511d9df5d25c693a7218a39$'),('p3f','p3l','1232893','12328961','0000-00-00','patient3','$6$rounds=5000$6a9339e208604664$iuWeP18vgTyfby/1laXr7RjwN2AOlWNTcJ8bHiFNkPM5Rvkbekt9mo3xMI12yfOMX7GR5kEcLNHWPV7T3N8e21','$6$rounds=5000$6a9339e20860466472ecbe37facb3018$'),('p4f','p4l','1232894','12328961','0000-00-00','patient4','$6$rounds=5000$4852f2a9e66f7ffa$wHG4R8AOD/rhlsh1I0ok3xrdaNrI75xyzwQLWLsS.qJnUamnbEWM5BshbKQmqpa8Ypdj5LOfPn.0ben/1eJOX0','$6$rounds=5000$4852f2a9e66f7ffa67dcbddf755b2700$'),('p5f','p5l','1232895','12328961','0000-00-00','patient5','$6$rounds=5000$e99998a487b97417$q6ry3T3mdA5O53wfQNbo1ZyoOHl2DG8QiOG0ukT/UiEID42xW9/eVM7cvzJe1UfYwy5JFy7uv2XSLbOqlBtHY/','$6$rounds=5000$e99998a487b974179a2aa2f42725f4d7$'),('p6f','p6l','1232896','12328961','0000-00-00','patient6','$6$rounds=5000$101e3f7193e9f934$gjwUFaLJkzwphaPBKV7Um/IDq4ED4LVAYxYDz1YiofOduL8ihlYpVRWRj3qFH7vsQcw0llW9bKx.3KrQmWZs./','$6$rounds=5000$101e3f7193e9f9345641ce3e96d7647e$'),('p7f','p7l','1232897','12328961','0000-00-00','patient7','$6$rounds=5000$d870f3d3ad442038$2l7n6jOgDy6hPYIy3TtDnYBTPwA01ZwsG4HIerdyMWrXeZ8KRqjnQch08mj7g7M4n/AdUXXRj9ouhl/I58Sbl.','$6$rounds=5000$d870f3d3ad442038e92655c09024ed2c$'),('p8f','p8l','1232898','12328961','0000-00-00','patient8','$6$rounds=5000$10d37eae950d51e3$MbGMVlGqfe89JYXvEeA1Ub4EhqldRjf6v5bwQwFfL35FGHZaL9eauJs/yVgTm40b01epd07cW2EKUzBcZ/Suh0','$6$rounds=5000$10d37eae950d51e307b41e3201bb7d51$'),('p9f','p9l','1232899','12328961','0000-00-00','patient9','$6$rounds=5000$b2ffcffc91cd5cb1$lrjvpOGmOGHWblv/vTAcdEyyaof0AeCAD5JQzJ.wNZ0WcbaVsREWKEw3ld.g9cQRVyxdUmCrEb9d8xkEpkuih0','$6$rounds=5000$b2ffcffc91cd5cb18c53193fd19c3fca$');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supervisor`
--

DROP TABLE IF EXISTS `supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supervisor` (
  `SID` varchar(10) NOT NULL,
  `SupID` varchar(10) NOT NULL,
  PRIMARY KEY (`SID`,`SupID`),
  CONSTRAINT `CareProviderIDfk_1` FOREIGN KEY (`SID`) REFERENCES `careprovider` (`StaffID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisor`
--

LOCK TABLES `supervisor` WRITE;
/*!40000 ALTER TABLE `supervisor` DISABLE KEYS */;
INSERT INTO `supervisor` VALUES ('1235334','12328901'),('1235361','12328901'),('125234901','12356541'),('13454563','42413485'),('34531374','12356541'),('35354366','12328901'),('3653654','42413485');
/*!40000 ALTER TABLE `supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waveexercise`
--

DROP TABLE IF EXISTS `waveexercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waveexercise` (
  `PID` varchar(10) NOT NULL,
  `DOE` datetime NOT NULL,
  `Hand` varchar(5) NOT NULL,
  `Repetition` int(11) NOT NULL,
  `Sequence` int(11) NOT NULL,
  `Movement` varchar(12) NOT NULL,
  `Minimum` decimal(4,2) NOT NULL,
  `Mean` decimal(4,2) NOT NULL,
  `Median` decimal(4,2) NOT NULL,
  `Maximum` decimal(4,2) NOT NULL,
  PRIMARY KEY (`PID`,`DOE`,`Repetition`,`Sequence`,`Movement`),
  CONSTRAINT `PatientWaveFK_1` FOREIGN KEY (`PID`) REFERENCES `patient` (`PatientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waveexercise`
--

LOCK TABLES `waveexercise` WRITE;
/*!40000 ALTER TABLE `waveexercise` DISABLE KEYS */;
INSERT INTO `waveexercise` VALUES ('1232890','2017-01-20 17:33:54','right',1,0,'extension',-6.90,-5.40,-5.54,-0.70),('1232890','2017-01-20 17:33:54','right',1,0,'flexion',-3.45,-2.80,-2.95,-1.88),('1232890','2017-01-20 17:33:54','right',1,1,'extension',-14.34,-7.80,-7.70,-2.08),('1232890','2017-01-20 17:33:54','right',1,1,'flexion',-10.54,-7.70,-9.00,-2.84);
/*!40000 ALTER TABLE `waveexercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wristexercisetargetlocations`
--

DROP TABLE IF EXISTS `wristexercisetargetlocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wristexercisetargetlocations` (
  `Exercise` varchar(25) NOT NULL,
  `Movement` varchar(10) NOT NULL,
  PRIMARY KEY (`Exercise`,`Movement`),
  CONSTRAINT `WristExerciseTargetLocation` FOREIGN KEY (`Exercise`) REFERENCES `exercises` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wristexercisetargetlocations`
--

LOCK TABLES `wristexercisetargetlocations` WRITE;
/*!40000 ALTER TABLE `wristexercisetargetlocations` DISABLE KEYS */;
INSERT INTO `wristexercisetargetlocations` VALUES ('Wave','extension'),('Wave','flexion');
/*!40000 ALTER TABLE `wristexercisetargetlocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wristtargets`
--

DROP TABLE IF EXISTS `wristtargets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wristtargets` (
  `PID` varchar(10) NOT NULL,
  `Exercise` varchar(25) NOT NULL,
  `Hand` varchar(5) NOT NULL,
  `Movement` varchar(12) NOT NULL,
  `Target` decimal(4,2) NOT NULL,
  `Repetition` int(11) NOT NULL,
  `Sequence` int(11) NOT NULL,
  PRIMARY KEY (`PID`,`Exercise`,`Hand`,`Movement`),
  KEY `Exercise` (`Exercise`),
  CONSTRAINT `PatientWristTargetsFK_1` FOREIGN KEY (`PID`) REFERENCES `patient` (`PatientID`),
  CONSTRAINT `wristtargets_ibfk_1` FOREIGN KEY (`Exercise`) REFERENCES `exercises` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wristtargets`
--

LOCK TABLES `wristtargets` WRITE;
/*!40000 ALTER TABLE `wristtargets` DISABLE KEYS */;
INSERT INTO `wristtargets` VALUES ('1232890','Wave','right','extension',20.00,1,2),('1232890','Wave','right','flexion',20.00,1,2);
/*!40000 ALTER TABLE `wristtargets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-11 13:02:46
