<?php
session_start();
// echo $_POST["introduce_no"];
// echo $_SESSION["memNo"];
try {
    require_once "./connectMySql.php";

    if ($pdo != false) {
        // 接收col_state值
        $sql = "select * from `skill_collect` where ski_no = :SKI_NO and MEM_NO = :MEM_NO";
        $ski_final = $pdo->prepare($sql);
        $ski_final->bindValue(":SKI_NO", $_POST["introduce_no"]);
        $ski_final->bindValue(":MEM_NO", $_SESSION["memNo"]);
        $ski_final->execute();
        $row = $ski_final->fetch(PDO::FETCH_OBJ);
        $favState = $row->SKI_COL_STATE;
        if ($ski_final->rowCount() == 0) {
            echo 0;
        } else {
            echo $favState;
        }

    }
} catch (PDOException $e) {
    echo $e;
}
