<?php

try {
  require_once("./connectMySql.php");


  $artReportUp = json_decode($_POST["artReportJson"], true);

  $artReportSql = "update ARTICLE_REPORT set ART_REP_PASS = :ART_REP_PASS where ART_REP_NO = :ART_REP_NO ";
  $artSql = "update discuss_area set DIS_HIDDEN = :DIS_HIDDEN where DIS_NO = :DIS_NO ";

  $artReportData = $pdo->prepare($artReportSql);
  $artData = $pdo->prepare($artSql);

  $artReportData->bindValue(":ART_REP_PASS", $artReportUp["ART_REP_PASS"]);
  $artReportData->bindValue(":ART_REP_NO", $artReportUp["ART_REP_NO"]);
  $artData->bindValue(":DIS_NO", $artReportUp["DIS_NO"]);
  if (strval($artReportUp["ART_REP_PASS"]) == '1') {
    $artData->bindValue(":DIS_HIDDEN", 0);
  } else {
    $artData->bindValue(":DIS_HIDDEN", 1);
  }


  $artReportData->execute(); //執行
  $artData->execute(); //執行


  // echo "已成功修改";
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
