-- Drop existing tables in reverse order to handle dependencies
DROP TABLE IF EXISTS SPRING_SESSION_ATTRIBUTES;
DROP TABLE IF EXISTS SPRING_SESSION;
DROP TABLE IF EXISTS vote;
DROP TABLE IF EXISTS survey_option;
DROP TABLE IF EXISTS survey_question;
DROP TABLE IF EXISTS survey;

CREATE TABLE survey (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL,
                        description TEXT,
                        start_date DATETIME NOT NULL,
                        end_date DATETIME NOT NULL,
                        is_public BOOLEAN NOT NULL,
                        created_by TEXT NOT NULL,
                        FOREIGN KEY (created_by) REFERENCES users (username)
);

CREATE TABLE survey_question (
                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 survey_id INTEGER NOT NULL,
                                 question_text TEXT NOT NULL,
                                 type TEXT NOT NULL CHECK (type IN ('single-choice', 'multiple-choice')),
                                 is_required BOOLEAN NOT NULL,
                                 FOREIGN KEY (survey_id) REFERENCES survey (id)
);

CREATE TABLE survey_option (
                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                               question_id INTEGER NOT NULL,
                               option_text TEXT NOT NULL,
                               FOREIGN KEY (question_id) REFERENCES survey_question (id)
);

CREATE TABLE vote (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      user_id TEXT NOT NULL,
                      option_id INTEGER NOT NULL,
                      voted_at DATETIME NOT NULL,
                      FOREIGN KEY (user_id) REFERENCES users (username),
                      FOREIGN KEY (option_id) REFERENCES survey_option (id)
);

-- Spring Session tables (as per Spring Session documentation)
CREATE TABLE SPRING_SESSION (
                                PRIMARY_ID TEXT NOT NULL,
                                SESSION_ID TEXT NOT NULL,
                                CREATION_TIME INTEGER NOT NULL,
                                LAST_ACCESS_TIME INTEGER NOT NULL,
                                MAX_INACTIVE_INTERVAL INTEGER NOT NULL,
                                EXPIRY_TIME INTEGER NOT NULL,
                                PRINCIPAL_NAME TEXT,
                                PRIMARY KEY (PRIMARY_ID)
);

CREATE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);

CREATE TABLE SPRING_SESSION_ATTRIBUTES (
                                           SESSION_PRIMARY_ID TEXT NOT NULL,
                                           ATTRIBUTE_NAME TEXT NOT NULL,
                                           ATTRIBUTE_BYTES BLOB NOT NULL,
                                           PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
                                           FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION (PRIMARY_ID) ON DELETE CASCADE
);
