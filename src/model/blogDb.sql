use database hackathon;

create table blogs(
    blogId INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    contents VARCHAR(100),
    userId INT,
    categoryId INT,
    createdTimestamp DATETIME default CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(userId),
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);