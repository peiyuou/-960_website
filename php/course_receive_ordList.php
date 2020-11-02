<?php
session_start();

try {
    require_once "./connectMySql.php";

    if ($pdo != false) {

        $sql = "SELECT ord_no,ord_amount,ord_pay,ord_date FROM order_mem where ord_no = :ORD_NO;";
        $disAll = $pdo->prepare($sql);
        $disAll->bindValue(":ORD_NO", $_POST["ord_no"]);
        $disAll->execute();
        if ($disAll->rowCount() == 0) {
            echo 0;
        } else {
            $disRow = $disAll->fetchAll(PDO::FETCH_ASSOC);
            //送出json字串
            echo json_encode($disRow);
        }

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
