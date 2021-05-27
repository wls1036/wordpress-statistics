<?php
require_once('../wp-config.php');
require_once('../wp-includes/wp-db.php');
require_once('../wp-includes/class-wp-http-curl.php');

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    return;
}

$days = $_GET["days"];

$where = null;
if ($days != null && intval($days != -1)) {
    $where = "to_days(now())-to_days(visit_time)<" . intval($days);
} else {
    $where = "1=1";
}
$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);

$sql = "select DATE_FORMAT(visit_time,'%Y-%m-%d') as day,count(1) pv from wp_statistic where " . $where . " group by day  order by day desc";

$rows = $wpdb->get_results($sql);
$result = array();
$result['code'] = 200;
$result['data'] = $rows;
echo json_encode($result);
?>
