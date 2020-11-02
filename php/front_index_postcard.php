<?php
try {
    require_once "connectMySql.php";
    $postcardSql = "select * from POSTCARD where POS_SEN_DATE <= CURRENT_DATE";
    $postcard = $pdo->query($postcardSql);

    if ($postcard->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $postcardRow = $postcard->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($postcardRow);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>