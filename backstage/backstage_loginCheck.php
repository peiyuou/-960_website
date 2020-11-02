<?php
session_start();
$AD_PASSWORD = $_POST["AD_PASSWORD"];
$AD_ACCOUNT = $_POST["AD_ACCOUNT"];
try {
  require_once("./connectMySql.php");
  // 抓管理員資料
  $ADSql = "select * from `administrator` where AD_ACCOUNT=:AD_ACCOUNT and AD_PASSWORD=:AD_PASSWORD and AD_MAT_USE=0 ";
  $AD = $pdo->prepare($ADSql);
  $AD->bindValue(":AD_PASSWORD", $AD_PASSWORD);
  $AD->bindValue(":AD_ACCOUNT", $AD_ACCOUNT);
  $AD->execute(); //執行

  if ($AD->rowCount() == 0) { //找不到
    echo 0;
  } else {
    $ADRow = $AD->fetch(PDO::FETCH_ASSOC);
    //登入成功,將登入者的資料寫入session
    $_SESSION["AD_ACCOUNT"] = $ADRow["AD_ACCOUNT"];
    $_SESSION["AD_NAME"] = $ADRow["AD_NAME"];
    echo 1;
  }
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
