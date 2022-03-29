use sys;
CREATE TABLE `user` (
	`usreId`	VARCHAR(20)	NOT NULL,
	`email`	VARCHAR(100)	NOT NULL,
	`password`	VARCHAR(300)	NOT NULL
);

CREATE TABLE `sentStory` (
	`storyId`	VARCHAR(20)	NOT NULL,
	`senderId`	VARCHAR(20)	NOT NULL,
	`waitingId`	INT	NOT NULL,
	`dateSent`	DATETIME	NOT NULL,
	`image`	VARCHAR(300)	NOT NULL
);

CREATE TABLE `selectedKeyword` (
	`storyId`	VARCHAR(20)	NOT NULL,
	`usreId`	VARCHAR(20)	NOT NULL,
	`keyword`	VARCHAR(300)	NOT NULL
);

CREATE TABLE `userProfile` (
	`usreId`	VARCHAR(20)	NOT NULL,
	`profilePic`	INT	NOT NULL,
	`nickname`	VARCHAR(100)	NOT NULL,
	`location`	VARCHAR(100)	NOT NULL
);

CREATE TABLE `requestType` (
	`requestId`	INT	NOT NULL,
	`typeName`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `report` (
	`reportId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`storyId`	VARCHAR(20)	NULL,
	`usreId`	VARCHAR(20)	NOT NULL,
	`targetId`	VARCHAR(20)	NOT NULL,
	`reportDate`	DATETIME	NOT NULL
);

CREATE TABLE `waitingTime` (
	`waitingId`	INT	NOT NULL,
	`waitingTime`	FLOAT	NOT NULL,
	`waitingName`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `receivedStory` (
	`storyId`	VARCHAR(20)	NOT NULL,
	`receiverId`	VARCHAR(20)	NULL,
	`dateReceived`	DATETIME	NULL
);

CREATE TABLE `request` (
	`usreId`	VARCHAR(20)	NOT NULL,
	`requestId`	INT	NOT NULL,
	`requestedId`	INT	NOT NULL
);

CREATE TABLE `deletedStory` (
	`usreId`	VARCHAR(20)	NOT NULL,
	`storyId`	VARCHAR(20)	NOT NULL
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`usreId`
);

ALTER TABLE `sentStory` ADD CONSTRAINT `PK_SENTSTORY` PRIMARY KEY (
	`storyId`,
	`senderId`,
	`waitingId`
);

ALTER TABLE `selectedKeyword` ADD CONSTRAINT `PK_SELECTEDKEYWORD` PRIMARY KEY (
	`storyId`,
	`usreId`
);

ALTER TABLE `userProfile` ADD CONSTRAINT `PK_USERPROFILE` PRIMARY KEY (
	`usreId`
);

ALTER TABLE `requestType` ADD CONSTRAINT `PK_REQUESTTYPE` PRIMARY KEY (
	`requestId`
);

ALTER TABLE `waitingTime` ADD CONSTRAINT `PK_WAITINGTIME` PRIMARY KEY (
	`waitingId`
);

ALTER TABLE `receivedStory` ADD CONSTRAINT `PK_RECEIVEDSTORY` PRIMARY KEY (
	`storyId`
);

ALTER TABLE `request` ADD CONSTRAINT `PK_REQUEST` PRIMARY KEY (
	`usreId`,
	`requestId`
);

ALTER TABLE `deletedStory` ADD CONSTRAINT `PK_DELETEDSTORY` PRIMARY KEY (
	`usreId`,
	`storyId`
);

ALTER TABLE `sentStory` ADD CONSTRAINT `FK_user_TO_sentStory_1` FOREIGN KEY (
	`senderId`
)
REFERENCES `user` (
	`usreId`
);

ALTER TABLE `sentStory` ADD CONSTRAINT `FK_waitingTime_TO_sentStory_1` FOREIGN KEY (
	`waitingId`
)
REFERENCES `waitingTime` (
	`waitingId`
);

ALTER TABLE `selectedKeyword` ADD CONSTRAINT `FK_sentStory_TO_selectedKeyword_1` FOREIGN KEY (
	`storyId`
)
REFERENCES `sentStory` (
	`storyId`
);

ALTER TABLE `selectedKeyword` ADD CONSTRAINT `FK_sentStory_TO_selectedKeyword_2` FOREIGN KEY (
	`usreId`
)
REFERENCES `sentStory` (
	`senderId`
);

ALTER TABLE `userProfile` ADD CONSTRAINT `FK_user_TO_userProfile_1` FOREIGN KEY (
	`usreId`
)
REFERENCES `user` (
	`usreId`
);

ALTER TABLE `report` ADD CONSTRAINT `FK_sentStory_TO_report_1` FOREIGN KEY (
	`storyId`
)
REFERENCES `sentStory` (
	`storyId`
);

ALTER TABLE `report` ADD CONSTRAINT `FK_user_TO_report_1` FOREIGN KEY (
	`usreId`
)
REFERENCES `user` (
	`usreId`
);

ALTER TABLE `receivedStory` ADD CONSTRAINT `FK_sentStory_TO_receivedStory_1` FOREIGN KEY (
	`storyId`
)
REFERENCES `sentStory` (
	`storyId`
);

ALTER TABLE `request` ADD CONSTRAINT `FK_user_TO_request_1` FOREIGN KEY (
	`usreId`
)
REFERENCES `user` (
	`usreId`
);

ALTER TABLE `request` ADD CONSTRAINT `FK_requestType_TO_request_1` FOREIGN KEY (
	`requestId`
)
REFERENCES `requestType` (
	`requestId`
);

ALTER TABLE `deletedStory` ADD CONSTRAINT `FK_user_TO_deletedStory_1` FOREIGN KEY (
	`usreId`
)
REFERENCES `user` (
	`usreId`
);

ALTER TABLE `deletedStory` ADD CONSTRAINT `FK_sentStory_TO_deletedStory_1` FOREIGN KEY (
	`storyId`
)
REFERENCES `sentStory` (
	`storyId`
);

