<?php
session_start();

try {
    require_once "./connectMySql.php";

    if ($pdo != false) {

        if(isset($_SESSION["memNo"])){
            $sql = "SELECT distinct a.ski_no
            from order_detail a join order_mem b on a.ord_no = b.ord_no
            where mem_no = :MEM_NO;";
            $disAll = $pdo->prepare($sql);
            $disAll->bindValue(":MEM_NO", $_SESSION["memNo"]);
            $disAll->execute();
            if ($disAll->rowCount() == 0) {
                echo 0;
            } else {
                $disRow = $disAll->fetchAll(PDO::FETCH_ASSOC);
                //送出json字串
                echo json_encode($disRow);
            }
        }
        else{
            echo 0;
        }

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
