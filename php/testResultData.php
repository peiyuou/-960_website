<?php
session_start();

try{
    require_once "./connectMySql.php";
// 送進去
$sendResultSql = " insert into `quiz_result_analysis`(`MEM_NO`,`QUIZ_RES_TYPE_R`,`QUIZ_RES_TYPE_I`,`QUIZ_RES_TYPE_A`,`QUIZ_RES_TYPE_S`,`QUIZ_RES_TYPE_E`,`QUIZ_RES_TYPE_C`,`QUIZ_RES_DATE`,`QUIZ_RES_FIT_TYPE`)VALUES( :MEM_NO, :QUIZ_RES_TYPE_R, :QUIZ_RES_TYPE_I, :QUIZ_RES_TYPE_A, :QUIZ_RES_TYPE_S, :QUIZ_RES_TYPE_E, :QUIZ_RES_TYPE_C, curdate(), :QUIZ_RES_FIT_TYPE) ";
$resultDetail = $pdo->prepare($sendResultSql);
$resultDetail ->bindValue(":MEM_NO",$_SESSION["memNo"]);
$resultDetail ->bindValue(":QUIZ_RES_TYPE_R",$_POST["typeR"]);
$resultDetail ->bindValue(":QUIZ_RES_TYPE_I",$_POST["typeI"]);
$resultDetail ->bindValue(":QUIZ_RES_TYPE_A",$_POST["typeA"]);
$resultDetail ->bindValue(":QUIZ_RES_TYPE_S",$_POST["typeS"]);
$resultDetail ->bindValue(":QUIZ_RES_TYPE_E",$_POST["typeE"]);
$resultDetail ->bindValue(":QUIZ_RES_TYPE_C",$_POST["typeC"]);
$resultDetail ->bindValue(":QUIZ_RES_FIT_TYPE",$_POST["userType"]);
$resultDetail ->execute();

// 課程要撈 課程編號 類型 課程明稱 課程圖片 購買人數 時數 價格 顏色
// 論壇 = 類型 顏色 之類的很多就對了
echo "已儲存";
}catch(PDOException $e){
    echo $e->getMessage(); 
}



?>

