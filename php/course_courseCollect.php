<?php
try {
    require_once "./connectMySql.php";
    // echo $_POST["ski_no"];
    // echo $_POST["mem_no"];

    if ($pdo != false) {

        // 確認有沒有收藏過課程
        $sql = "select * from `skill_collect` where ski_no = :SKI_NO and MEM_NO = :MEM_NO";
        $ski_fav = $pdo->prepare($sql);
        $ski_fav->bindValue(":SKI_NO", $_POST["ski_no"]);
        $ski_fav->bindValue(":MEM_NO", $_POST["mem_no"]);
        $ski_fav->execute();
        $row = $ski_fav->fetch(PDO::FETCH_OBJ);
        $colState = $row->SKI_COL_STATE;

        if ($ski_fav->rowCount() == 0) {
            $sql = "insert into `skill_collect`(ski_no, mem_no) values(:SKI_NO, :MEM_NO)";
        } else {
            if ($colState == 0) {
                $sql = "update `skill_collect` set ski_col_state = 1 where ski_no = :SKI_NO and mem_no = :MEM_NO";
            } else {
                $sql = "update `skill_collect` set ski_col_state = 0 where ski_no = :SKI_NO and mem_no = :MEM_NO";
            }
        }
        $ski_fav_set = $pdo->prepare($sql);
        $ski_fav_set->bindValue(":SKI_NO", $_POST["ski_no"]);
        $ski_fav_set->bindValue(":MEM_NO", $_POST["mem_no"]);
        $ski_fav_set->execute();

        // 接收col_state值
        $sql = "select * from `skill_collect` where ski_no = :SKI_NO and MEM_NO = :MEM_NO";
        $ski_final = $pdo->prepare($sql);
        $ski_final->bindValue(":SKI_NO", $_POST["ski_no"]);
        $ski_final->bindValue(":MEM_NO", $_POST["mem_no"]);
        $ski_final->execute();
        $row = $ski_final->fetch(PDO::FETCH_OBJ);
        $favState = $row->SKI_COL_STATE;
        echo $favState;

    }
} catch (PDOException $e) {
    echo $e;
}
