<?php
require_once('../wp-config.php');
require_once('../wp-includes/wp-db.php');
require_once('../wp-includes/class-wp-http-curl.php');

function row_sort($row1, $row2)
{
    if ($row1['pv'] == $row2['pv']) {
        return 0;
    }
    return ($row1['pv'] < $row2['pv']) ? 1 : -1;
}

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    return;
}

$cycle = $_GET["cycle"];
if ($cycle == null) {
    $cycle = "today";
}
$cycleWhere = null;
if (strcmp($cycle, "today")==0) {
    $cycleWhere = "to_days(visit_time)=to_days(now())";
} else if (strcmp($cycle, "yesterday")==0) {
    $cycleWhere = "to_days(now())-to_days(visit_time)=1";
} else if (strcmp($cycle, "week")==0) {
    $cycleWhere = "to_days(now())-to_days(visit_time)<=7";
} else if (strcmp($cycle, "month")==0) {
    $cycleWhere = "to_days(now())-to_days(visit_time)<=30";
} else if (strcmp($cycle, "all")==0) {
    $cycleWhere = "1=1";
}
$searchContent = $_GET['searchContent'];
$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
$params = array();
if ($searchContent != null) {
    $searchContent = '%' . $wpdb->esc_like($searchContent) . '%';
    $where = $cycleWhere . " and (title like '%s')";
    array_push($params, $searchContent);
} else {
    $where = $cycleWhere;
}

$sql = "select title,ip,count(1) cnt from wp_statistic where " . $where . " group by title,ip";

$rows = $wpdb->get_results($wpdb->prepare($sql, $params));
$map = array();
foreach ($rows as $row) {
    $item = $map[$row->title];
    if ($item != null) {
        $item['uv'] = intval($item['uv']) + 1;
        $item['pv'] = intval($item['pv']) + $row->cnt;
    } else {
        $item['uv'] = 1;
        $item['title'] = $row->title;
        $item['pv'] = intval($row->cnt);
    }
    $map[$row->title] = $item;
}
$data = array();
foreach ($map as $item) {
    array_push($data, $item);
}
usort($data, 'row_sort');
$result = array();
$result['code'] = 200;
$result['data'] = $data;
echo json_encode($result);
?>
