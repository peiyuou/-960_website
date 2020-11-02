<?php
try {
    require_once "connectMySql.php";
    $carrTypeSql = " SELECT industry_class.IND_NO, industry_class.IND_CLASS, industry_class.IND_INFO FROM `industry_class`; ";
    $carrType = $pdo->query($carrTypeSql);

    if ($carrType->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $carrTypeRow = $carrType->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($carrTypeRow);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>