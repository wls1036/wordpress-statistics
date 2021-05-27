<?php

function make_randstr($length)
{
    $str = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    $keys = array_rand($str, $length);
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= $str[$keys[$i]];
    }
    return $password;
}

header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    return;
}

$username = $_GET["username"];
$password = $_GET["password"];

$result = array();

if ((strcmp($username, "Helen") == 0 && strcmp($password, "helen0226") == 0) ||
    (strcmp($username, "guest") == 0 && strcmp($password, "guest") == 0)) {
    $result['code'] = 200;
    $result['data']['token'] = strtoupper(make_randstr(24));
} else {
    $result['code'] = 401;
    $result['message'] = "用户名密码错误";
}
echo json_encode($result);
?>
