<?php

try {
    require_once("./connectMySql.php");

    
  $announceUp = json_decode($_POST["announceJson"], true);

  $announceSql = "update ANNOUNCEMENT set ANN_USE = :ANN_USE where ANN_NO = :ANN_NO;";
  $announceData = $pdo->prepare($announceSql);
  $announceData->bindValue(":ANN_USE", $announceUp["ANN_USE"]);
  $announceData->bindValue(":ANN_NO", $announceUp["ANN_NO"]);

  $announceData->execute(); //執行

  echo "已成功修改";
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
