<?php
session_start();

try {
    require_once "./connectMySql.php";
    $course_arr = JSON_DECODE($_POST["course_arr"], true);

    if ($pdo != false) {
        // insert into order_mem
        $sql = "INSERT INTO `order_mem` (mem_no,ord_discount,ord_amount,ord_pay,ord_date)
                    VALUES (:ORD_MEM_NO,:ORD_DISCOUNT,:ORD_AMOUNT,:ORD_PAY,current_timestamp);";
        $disAll = $pdo->prepare($sql);
        $disAll->bindValue(":ORD_MEM_NO", $_SESSION["memNo"]);
        $disAll->bindValue(":ORD_AMOUNT", $_POST["ord_amount"]);
        $disAll->bindValue(":ORD_PAY", $_POST["ord_pay"]);
        $disAll->bindValue(":ORD_DISCOUNT", $_POST["ord_discount"]);
        $disAll->execute();
        // echo 1;
        // =====================================
        // insert into order_detail
        foreach ($course_arr as $key => $value) {

            // 新增訂單明細
            $SKI_NO = (int) $value['ski_no'];
            $ORD_DET_PRICE = (int) $value['ski_price'];
            $sql = "INSERT INTO `order_detail` (ord_no,ski_no,ord_det_price)
                    VALUES ((select ord_no from order_mem where mem_no = :ORD_MEM_NO order by ord_date desc limit 1),
                    :SKI_NO , :ORD_DET_PRICE );";
            $disAll = $pdo->prepare($sql);
            $disAll->bindValue(":ORD_MEM_NO", $_SESSION["memNo"]);
            $disAll->bindValue(":SKI_NO", $SKI_NO);
            $disAll->bindValue(":ORD_DET_PRICE", $ORD_DET_PRICE);
            $disAll->execute();

            // -----------------------
            // 增加課程購買人數

            // $SKI_NO = (int) $value['ski_no'];
            // $ORD_DET_PRICE = (int) $value['ski_price'];
            $sql = "UPDATE `skill_class` set ski_buy_num = ski_buy_num+1 where ski_no = :SKI_NO;";
            $update = $pdo->prepare($sql);
            $update->bindValue(":SKI_NO", $SKI_NO);
            $update->execute();

        }
        // ====================
        // 成功後傳回訂單號碼
        if ($pdo != false) {
            $sql = "SELECT ord_no,ord_amount,ord_pay,ord_date FROM order_mem where mem_no = :ORD_MEM_NO order by ord_date desc limit 1;";
            $disAll = $pdo->prepare($sql);
            $disAll->bindValue(":ORD_MEM_NO", $_SESSION["memNo"]);
            $disAll->execute();
            if ($disAll->rowCount() == 0) {
                echo 0;
            } else {
                $disRow = $disAll->fetchAll(PDO::FETCH_ASSOC);
                //送出json字串
                echo json_encode($disRow);
            }
        }

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
