create table wp_statistic(
id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
ip varchar(20),
location varchar(200),
title varchar (200),
post_id int,
ua varchar (500),
referrer varchar (500),
visit_time timestamp NULL default CURRENT_TIMESTAMP
)