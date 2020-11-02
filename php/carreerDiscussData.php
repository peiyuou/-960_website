<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            if($_POST["controlNum"] == 0){
                if($_POST["MEM_NO"] == 0){
                    echo 0;
                    echo "*;";
                    echo 0;
                    echo "*;";
                    $sql = "select mem.MEM_NAME, mem.MEM_PIC, mes.DIS_MES_NO, mes.DIS_MES_CONTENT, mes.DIS_MES_DATE, mes.DIS_MES_HIDDEN from `discuss_message` mes join `member` mem on mes.MEM_NO = mem.MEM_NO where DIS_NO = :DIS_NO";
                    $member_col = $pdo -> prepare($sql);
                    $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
                    $member_col -> execute();
                    if($member_col -> rowCount() == 0){
                        echo 0;
                    }
                    else{
                        $row = $member_col -> fetchAll(PDO::FETCH_OBJ);
                        echo json_encode($row);
                    }
                    echo "*;";
                    echo 0;
                }
                else{
                    $sql = "select * from `article_collect` where DIS_NO = :DIS_NO and MEM_NO = :MEM_NO";
                    $member_col = $pdo -> prepare($sql);
                    $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
                    $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                    $member_col -> execute();
                    if($member_col -> rowCount() == 0){
                        echo 0;
                    }
                    else{
                        $row = $member_col -> fetch(PDO::FETCH_OBJ);
                        $colState = $row->ART_COL_STATE;
                        echo $colState;
                    }
                    echo "*;";
                    $sql = "select * from `article_like` where DIS_NO = :DIS_NO and MEM_NO = :MEM_NO";
                    $member_col = $pdo -> prepare($sql);
                    $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
                    $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                    $member_col -> execute();
                    if($member_col -> rowCount() == 0){
                        echo 0;
                    }
                    else{
                        $row = $member_col -> fetch(PDO::FETCH_OBJ);
                        $colState = $row->ART_LIK_STATE;
                        echo $colState;
                    }
                    echo "*;";
                    $sql = "select mem.MEM_NAME, mem.MEM_PIC, mes.DIS_MES_NO, mes.DIS_MES_CONTENT, mes.DIS_MES_DATE, mes.DIS_MES_HIDDEN from `discuss_message` mes join `member` mem on mes.MEM_NO = mem.MEM_NO where DIS_NO = :DIS_NO";
                    $member_col = $pdo -> prepare($sql);
                    $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
                    $member_col -> execute();
                    if($member_col -> rowCount() == 0){
                        echo 0;
                    }
                    else{
                        $row = $member_col -> fetchAll(PDO::FETCH_OBJ);
                        echo json_encode($row);
                    }
                    echo "*;";
                    $sql = "select * from `discuss_message` dis join `message_like` mes on dis.DIS_MES_NO = mes.DIS_MES_NO where dis.DIS_NO = :DIS_NO and mes.MEM_NO = :MEM_NO and mes.MES_LIK_STATE = 1";
                    $member_col = $pdo -> prepare($sql);
                    $member_col -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
                    $member_col -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
                    $member_col -> execute();
                    if($member_col -> rowCount() == 0){
                        echo 0;
                    }
                    else{
                        $row = $member_col -> fetchAll(PDO::FETCH_OBJ);
                        echo json_encode($row);
                    }
                }
            }
        }
    }catch(PDOException $e){
    }
?>