
CREATE TABLE IF NOT EXISTS proj_exercise
(
    ID INT AUTO_INCREMENT NOT NULL,
    EXERCISE_DESCRIPTION varchar(200),
    EXERCISE_CONDITION VARCHAR(900),
    EXERCISE_GENERATOR_RULES VARCHAR(900),
    GENERATOR_CODE VARCHAR(100),
    ANSWER VARCHAR(100) NOT NULL,
    EXERCISE_ADDITION_FILE_PATH VARCHAR(200),
    THEME_ID int not null,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_subject
(
    ID INT AUTO_INCREMENT NOT NULL,
    SUBJECT_NAME VARCHAR(100) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_class
(
	ID INT AUTO_INCREMENT NOT NULL,
	CLASS_NUMBER varchar(100) not null,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_class_subject
(
	ID int auto_increment not null,
	CLASS_ID int not null,
	SUBJECT_ID int not null,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_variant
(
    ID INT AUTO_INCREMENT NOT NULL,
    GENERATOR_CODE varchar(900),
    CLASS_NUMBER varchar(100) not null,
    SUBJECT_NAME varchar(100) not null,
	NAME varchar(100),

    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_exercise_variant
(
    EXERCISE_ID INT NOT NULL,
    VARIANT_ID INT NOT NULL,

    primary key (EXERCISE_ID,VARIANT_ID)
);



CREATE TABLE IF NOT EXISTS proj_variant_user
(
	GENERATOR_CODE varchar(900),
    USER_ID INT NOT NULL,
	PRIMARY KEY (GENERATOR_CODE,USER_ID)
);

CREATE TABLE IF NOT EXISTS proj_themes
(
	ID int auto_increment not null,
	NAME varchar(100) not null,
	DESCRIPTION varchar(500) not null,
	VIDEO_LINK varchar(500),
	LITERATURE_LINK varchar(500),
	USEFUL_LINK varchar(500),
	SUMMARY_LINK varchar(500),
	CLASS_NUMBER varchar(100) not null,
	SUBJECT_NAME varchar(100) not null,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_bug_categories
(
	ID int auto_increment not null,
	NAME varchar(200) not null,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_bug_report
(
	ID int auto_increment not null,
	CATEGORY_ID int not null,
	PAGE varchar(100) not null,
	DESCRIPTION varchar(1000) not null,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS proj_statistics
(
	ID int auto_increment not null,
	USER_ID int not null,
	CLASS_NUMBER varchar(100) not null,
	SUBJECT_NAME varchar(100) not null,
	SOLVED_TASKS int,
	TASKS_SOLVED_CORRECTLY int,
	PRIMARY KEY (ID)
);
