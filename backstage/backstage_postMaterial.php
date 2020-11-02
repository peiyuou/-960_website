<?php

try {
    require_once("./connectMySql.php");

    
  $postMaterialUp = json_decode($_POST["postJson"], true);

  $postMaterialSql = "update POSTCARD_MATERIAL set POS_MAT_USE = :POS_MAT_USE where POS_MAT_NO = :POS_MAT_NO";
  $postMaterialData = $pdo->prepare($postMaterialSql);
  $postMaterialData->bindValue(":POS_MAT_USE", $postMaterialUp["POS_MAT_USE"]);
  $postMaterialData->bindValue(":POS_MAT_NO", $postMaterialUp["POS_MAT_NO"]);
  $postMaterialData->execute(); //執行

  echo "已成功修改";
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
