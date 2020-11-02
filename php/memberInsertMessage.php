<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            $sql = "insert into `discuss_message`(`DIS_NO`, `MEM_NO`, `DIS_MES_CONTENT`, `DIS_MES_DATE`) values(:DIS_NO, :MEM_NO, :DIS_MES_CONTENT, :DIS_MES_DATE)";
            $member_all = $pdo -> prepare($sql);
            $member_all -> bindValue(":DIS_NO",$_POST["DIS_NO"]);
            $member_all -> bindValue(":MEM_NO",$_POST["MEM_NO"]);
            $member_all -> bindValue(":DIS_MES_CONTENT",$_POST["DIS_MES_CONTENT"]);
            $member_all -> bindValue(":DIS_MES_DATE",$_POST["DIS_MES_DATE"]);
            $member_all -> execute();
            $sql = "select * from `discuss_message` WHERE MEM_NO = :memNo order by DIS_MES_NO desc limit 1";
            $memberMessageNo = $pdo -> prepare($sql);
            $memberMessageNo -> bindValue(":memNo",$_POST["MEM_NO"]);
            $memberMessageNo -> execute();
            $data = $memberMessageNo->fetch(PDO::FETCH_OBJ);
            $sendData = $data->DIS_MES_NO;
            echo $sendData;
        }
    }catch(PDOException $e){
    }
?>