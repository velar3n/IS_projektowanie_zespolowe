-- Drop existing tables in reverse order to handle dependencies
DROP TABLE IF EXISTS SPRING_SESSION_ATTRIBUTES;
DROP TABLE IF EXISTS SPRING_SESSION;
DROP TABLE IF EXISTS survey;
DROP TABLE IF EXISTS vote;


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
