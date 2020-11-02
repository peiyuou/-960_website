<?php

try {
    require_once("./connectMySql.php");

    
  $adminUp = json_decode($_POST["adminJson"], true);

  $adminSql = "update ADMINISTRATOR set AD_MAT_USE = :AD_MAT_USE where AD_NO = :adNo";
  $adminData = $pdo->prepare($adminSql);
  $adminData->bindValue(":AD_MAT_USE", $adminUp["AD_MAT_USE"]);
  $adminData->bindValue(":adNo", $adminUp["adNo"]);
 
  $adminData->execute(); //執行

  echo "已成功修改";
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
