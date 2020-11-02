<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            $conNUM = $_POST["REP_CON_TEMP"];
            if($conNUM == 0){
                $sql = "select * from `article_report` where DIS_NO = :DIS_NO and MEM_NO = :MEM_NO";
                $member_rep = $pdo -> prepare($sql);
                $member_rep -> bindValue(":DIS_NO",$_POST["REP_NO"]);
                $member_rep -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                $member_rep -> execute();
                if($member_rep -> rowCount() == 0){
                    $sql = "insert into `article_report`(`DIS_NO`, `MEM_NO`, `ART_REP_CONTENT`) values(:DIS_NO, :MEM_NO, :ART_REP_CONTENT)";
                    $sql_calc = "update `discuss_area` set `DIS_REP_NUM` = `DIS_REP_NUM` + 1 where DIS_NO = :DIS_NO";
                    $member_rep = $pdo -> prepare($sql);
                    $member_rep -> bindValue(":DIS_NO",$_POST["REP_NO"]);
                    $member_rep -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                    $member_rep -> bindValue(":ART_REP_CONTENT",$_POST["ART_REP_CONTENT"]);
                    $member_rep -> execute();
                    $member_rep_num = $pdo -> prepare($sql_calc);
                    $member_rep_num -> bindValue(":DIS_NO",$_POST["REP_NO"]);
                    $member_rep_num -> execute();
                    echo 1;
                }
                else{
                    echo 0;
                }
            }
            else{
                $sql = "select * from `message_report` where DIS_MES_NO = :DIS_MES_NO and MEM_NO = :MEM_NO";
                $member_rep = $pdo -> prepare($sql);
                $member_rep -> bindValue(":DIS_MES_NO",$_POST["REP_NO"]);
                $member_rep -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                $member_rep -> execute();
                if($member_rep -> rowCount() == 0){
                    $sql = "insert into `message_report`(`DIS_MES_NO`, `MEM_NO`, `MES_REP_CONTENT`) values(:DIS_MES_NO, :MEM_NO, :MES_REP_CONTENT)";
                    $sql_calc = "update `discuss_message` set `DIS_MES_REP_NUM` = `DIS_MES_REP_NUM` + 1 where DIS_MES_NO = :DIS_MES_NO";
                    $member_rep = $pdo -> prepare($sql);
                    $member_rep -> bindValue(":DIS_MES_NO",$_POST["REP_NO"]);
                    $member_rep -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                    $member_rep -> bindValue(":MES_REP_CONTENT",$_POST["ART_REP_CONTENT"]);
                    $member_rep -> execute();
                    $member_rep_num = $pdo -> prepare($sql_calc);
                    $member_rep_num -> bindValue(":DIS_MES_NO",$_POST["REP_NO"]);
                    $member_rep_num -> execute();
                    echo 1;
                }
                else{
                    echo 0;
                }
            }
        }
    }catch(PDOException $e){
    }
?>