<?php
    session_start();
    // $postData = file_get_contents('php://input');
    // $requests = !empty($postData) ? json_decode($postData, true) : array();
    
    if(isset($_SESSION["memNo"])){
        $user = $_SESSION["memNo"];
        require_once("./connectMySql.php");
        $sql = "select * from `member` where MEM_NO = :MEM_NO";
        $member_all = $pdo -> prepare($sql);
        $member_all -> bindValue(":MEM_NO",$_POST['MEM_NO']);
        $member_all -> execute();
        $member_row=$member_all->fetch(PDO::FETCH_OBJ);
        $memPic = $member_row->MEM_PIC;
        echo json_encode($memPic);
    }
    else{
        echo 0;
    }
?>