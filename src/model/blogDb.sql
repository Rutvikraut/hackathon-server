use database hackathon;

create table blogs(
    blogId INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    contents VARCHAR(100),
    createdTimestamp DATE default CURRENT_TIMESTAMP,
    user_id INT FOREIGN KEY REFERENCES user(userId)
    category_id INT FOREIGN KEY REFERENCES categories(categoryId)
);