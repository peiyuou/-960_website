<?php
    session_start();
    // $postData = file_get_contents('php://input');
    // $requests = !empty($postData) ? json_decode($postData, true) : array();
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            $sql = "select * from `member` where MEM_EMAIL = :MEM_EMAIL";
            $member_all = $pdo -> prepare($sql);
            $member_all -> bindValue(":MEM_EMAIL",$_POST["memAccount"]);
            $member_all -> execute();
            if($member_all -> rowCount() == 0){
                $sql = "insert into `member`(`MEM_NAME`, `MEM_CODE`, `MEM_EMAIL`) values(:MEM_NAME, :MEM_CODE, :MEM_EMAIL)";
                $member_all = $pdo -> prepare($sql);
                $member_all -> bindValue(":MEM_EMAIL",$_POST["memAccount"]);
                $member_all -> bindValue(":MEM_CODE",$_POST["memCode"]);
                $member_all -> bindValue(":MEM_NAME",$_POST["memName"]);
                $member_all -> execute();
                $sql = "select * from `member` where MEM_EMAIL = :MEM_EMAIL";
                $member_all = $pdo -> prepare($sql);
                $member_all -> bindValue(":MEM_EMAIL",$_POST["memAccount"]);
                $member_all -> execute();
                $member_row=$member_all->fetch(PDO::FETCH_OBJ);
                $_SESSION["memNo"] = $member_row->MEM_NO;
                $_SESSION["memName"] = $member_row->MEM_NAME;
                echo 0;
            }
            else{
                echo 1;
            }
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>