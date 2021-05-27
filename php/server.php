<?php
require_once('../wp-config.php');
require_once('../wp-includes/wp-db.php');
require_once('../wp-includes/class-wp-http-curl.php');
header("Content-Type: text/html; charset=utf-8");
$title = $_GET["title"];
$referrer = $_GET["referrer"];
$ua = $_SERVER['HTTP_USER_AGENT'];
$ua = '';
$ip = $_SERVER['REMOTE_ADDR'];
$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
$http = new WP_Http_Curl();
$resopnse = $http->request('http://whois.pconline.com.cn/ip.jsp?ip=' . $ip);
$location = iconv('GB2312', 'UTF-8', $resopnse['body']);
$wpdb->query($wpdb->prepare("INSERT INTO wp_statistic(ip,location,title,ua,referrer) VALUES (%s,%s,%s,%s,%s)", $ip, $location, $title, $ua, $referrer));
?>
