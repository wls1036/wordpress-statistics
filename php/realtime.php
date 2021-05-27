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

$title = $_GET["title"];
$searchContent = $_GET['searchContent'];
$page = $_GET['page'];
$limit = $_GET['limit'];
if ($page == null) {
    $page = 1;
}
if ($limit == null) {
    $limit = 10;
}
$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);

$sql = "select * from wp_statistic where 1=1 ";
$countSQL = "select count(1) as cnt from wp_statistic where 1=1";
$params = array();
if ($searchContent != null) {
    $searchContent = '%' . $wpdb->esc_like($searchContent) . '%';
    $sql = $sql . " and (title like '%s' or location like '%s')";
    $countSQL = $countSQL . " and (title like '%s' or location like '%s')";
    array_push($params, $searchContent);
    array_push($params, $searchContent);
} else {
    if ($title != null) {
        $title = '%' . $wpdb->esc_like($title) . '%';
        $sql = $sql . " and (title like '%s')";
        $countSQL = $countSQL . " and (title like '%s')";
        array_push($params, $title);
    }
}

$sql = $sql . 'order by visit_time desc limit ' . ($limit * ($page - 1)) . ',' . $limit;

$totalRows = $wpdb->get_results($wpdb->prepare($countSQL, $params));
$total = intval($totalRows[0]->cnt);


$rows = $wpdb->get_results($wpdb->prepare($sql, $params));
$result = array();
$result['totalCount'] = $total;
$result['code'] = 200;
$result['data'] = $rows;
echo json_encode($result);
?>
