<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){

            $sql = "select * from `article_like` where DIS_NO = :DIS_NO and MEM_NO = :MEM_NO";
            $member_col = $pdo -> prepare($sql);
            $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
            $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
            $member_col -> execute();
            $row = $member_col -> fetch(PDO::FETCH_OBJ);
            $colState = $row->ART_LIK_STATE;
            if($member_col -> rowCount() == 0){
                $sql = "insert into `article_like`(`DIS_NO`, `MEM_NO`) values(:DIS_NO, :MEM_NO)";
                $sql_calc = "update `discuss_area` set `DIS_LIK_NUM` = `DIS_LIK_NUM` + 1 where DIS_NO = :DIS_NO";
            }
            else{
                if($colState == 0){
                    $sql = "update `article_like` set ART_LIK_STATE = 1 where DIS_NO = :DIS_NO and MEM_NO = :MEM_NO";
                    $sql_calc = "update `discuss_area` set `DIS_LIK_NUM` = `DIS_LIK_NUM` + 1 where DIS_NO = :DIS_NO";
                }
                else{
                    $sql = "update `article_like` set ART_LIK_STATE = 0 where DIS_NO = :DIS_NO and MEM_NO = :MEM_NO";
                    $sql_calc = "update `discuss_area` set `DIS_LIK_NUM` = `DIS_LIK_NUM` - 1 where DIS_NO = :DIS_NO";
                }
            }
            $member_col = $pdo -> prepare($sql);
            $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
            $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
            $member_col -> execute();
            $member_col_num = $pdo -> prepare($sql_calc);
            $member_col_num -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
            $member_col_num -> execute();
        }
    }catch(PDOException $e){
    }
?>