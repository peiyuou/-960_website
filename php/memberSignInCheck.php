<?php
    session_start();
    // $postData = file_get_contents('php://input');
    // $requests = !empty($postData) ? json_decode($postData, true) : array();
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            $sql = "select * from `member` where MEM_EMAIL = :MEM_EMAIL and MEM_CODE = :MEM_CODE";
            $member_all = $pdo -> prepare($sql);
            $member_all -> bindValue(":MEM_EMAIL",$_POST["memAccount"]);
            $member_all -> bindValue(":MEM_CODE",$_POST["memCode"]);
            $member_all -> execute();
            if($member_all -> rowCount() == 0){
                echo 0;
            }
            else{
                $member_row=$member_all->fetch(PDO::FETCH_ASSOC);
                if($member_row["MEM_USE"] == 0){
                    $_SESSION["memNo"] = $member_row["MEM_NO"];
                    $_SESSION["memName"] = $member_row["MEM_NAME"];
                    echo $member_row["MEM_NO"];
                }
                else{
                    echo -1;
                }
            }
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>