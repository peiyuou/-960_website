<?php

try {
    require_once("./connectMySql.php");

    
  $memberUp = json_decode($_POST["memberJson"], true);

  $memberSql = "update member set MEM_USE = :MEM_USE where MEM_NO = :memNo";
  $memberData = $pdo->prepare($memberSql);
  $memberData->bindValue(":MEM_USE", $memberUp["MEM_USE"]);
  $memberData->bindValue(":memNo", $memberUp["memNo"]);
 
  $memberData->execute(); //執行

  echo "已成功修改";
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
