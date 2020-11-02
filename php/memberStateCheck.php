<?php
    session_start();
    // $postData = file_get_contents('php://input');
    // $requests = !empty($postData) ? json_decode($postData, true) : array();
    
    if(isset($_SESSION["memNo"])){
        $user = $_SESSION["memNo"];
        $userName = $_SESSION["memName"];
        echo $user;
        echo ";";
        echo $userName;
    }
    else{
        echo 0;
    }
?>