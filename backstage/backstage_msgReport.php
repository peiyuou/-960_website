<?php

try {
  require_once("./connectMySql.php");


  $msgReportUp = json_decode($_POST["msgReportJson"], true);

  $msgReportSql = "update MESSAGE_REPORT set MES_REP_PASS = :MES_REP_PASS where MES_REP_NO = :MES_REP_NO";

  $msgSql = "update discuss_message set DIS_MES_HIDDEN = :DIS_MES_HIDDEN where DIS_MES_NO = :DIS_MES_NO";

  $msgReportData = $pdo->prepare($msgReportSql);
  $msgData = $pdo->prepare($msgSql);
  $msgReportData->bindValue(":MES_REP_PASS", $msgReportUp["MES_REP_PASS"]);
  $msgReportData->bindValue(":MES_REP_NO", $msgReportUp["MES_REP_NO"]);
  $msgData->bindValue(":DIS_MES_NO", $msgReportUp["DIS_MES_NO"]);

  if (strval($msgReportUp["MES_REP_PASS"]) == '1') {
    // echo 123;
    $msgData->bindValue(":DIS_MES_HIDDEN", 0);
  } else {
    // echo 456;
    $msgData->bindValue(":DIS_MES_HIDDEN", 1);
  }

  $msgReportData->execute(); //執行
  $msgData->execute(); //執行

  echo "已成功修改";
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
