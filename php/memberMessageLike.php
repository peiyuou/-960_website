<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){

            $sql = "select * from `message_like` where DIS_MES_NO = :DIS_MES_NO and MEM_NO = :MEM_NO";
            $member_col = $pdo -> prepare($sql);
            $member_col -> bindValue(":DIS_MES_NO",$_POST["DIS_MES_NO"]);
            $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
            $member_col -> execute();
            if($member_col -> rowCount() == 0){
                $sql = "insert into `message_like`(`DIS_MES_NO`, `MEM_NO`) values(:DIS_MES_NO, :MEM_NO)";
                $sql_calc = "update `discuss_message` set `DIS_MES_LIK_NUM` = `DIS_MES_LIK_NUM` + 1 where DIS_MES_NO = :DIS_MES_NO";
            }
            else{
                $row = $member_col -> fetch(PDO::FETCH_OBJ);
                $colState = $row->MES_LIK_STATE;
                if($colState == 0){
                    $sql = "update `message_like` set MES_LIK_STATE = 1 where DIS_MES_NO = :DIS_MES_NO and MEM_NO = :MEM_NO";
                    $sql_calc = "update `discuss_message` set `DIS_MES_LIK_NUM` = `DIS_MES_LIK_NUM` + 1 where DIS_MES_NO = :DIS_MES_NO";
                }
                else{
                    $sql = "update `message_like` set MES_LIK_STATE = 0 where DIS_MES_NO = :DIS_MES_NO and MEM_NO = :MEM_NO";
                    $sql_calc = "update `discuss_message` set `DIS_MES_LIK_NUM` = `DIS_MES_LIK_NUM` - 1 where DIS_MES_NO = :DIS_MES_NO";
                }
            }
            $member_col = $pdo -> prepare($sql);
            $member_col -> bindValue(":DIS_MES_NO",$_POST["DIS_MES_NO"]);
            $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
            $member_col -> execute();
            $member_col_num = $pdo -> prepare($sql_calc);
            $member_col_num -> bindValue(":DIS_MES_NO",$_POST["DIS_MES_NO"]);
            $member_col_num -> execute();
        }
    }catch(PDOException $e){
    }
?>