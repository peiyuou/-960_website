<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            
            $sql = "update `member` set MEM_NAME = :MEM_NAME, MEM_CODE = :MEM_CODE, MEM_TEL = :MEM_TEL where MEM_NO = :memNo";
            $memberDataAll = $pdo -> prepare($sql);
            $memberDataAll -> bindValue(":MEM_NAME",$_POST["memName"]);
            $memberDataAll -> bindValue(":MEM_CODE",$_POST["memCode"]);
            $memberDataAll -> bindValue(":MEM_TEL",$_POST["memTel"]);
            $memberDataAll -> bindValue(":memNo",$_POST["memNo"]);
            $memberDataAll -> execute();
        }
    }catch(PDOException $e){
    }
?>