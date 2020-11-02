<?php
try {
  require_once("./connectMySql.php");
  $sql = "select * from administrator where AD_ACCOUNT = :AD_ACCOUNT";
  $oldAd = $pdo->prepare($sql);
  $oldAd->bindValue(":AD_ACCOUNT", $_POST["AD_ACCOUNT"]);
  $oldAd->execute();
  if ($oldAd->rowCount() == 0) {
    $addAd = "insert into administrator (AD_NAME,AD_ACCOUNT,AD_PASSWORD,AD_MAT_USE)
values(:AD_NAME,:AD_ACCOUNT,:AD_PASSWORD,'0');";

    $insertAd = $pdo->prepare($addAd);
    $insertAd->bindValue(":AD_NAME", $_POST["AD_NAME"]);
    $insertAd->bindValue(":AD_ACCOUNT", $_POST["AD_ACCOUNT"]);
    $insertAd->bindValue(":AD_PASSWORD", $_POST["AD_PASSWORD"]);
    $insertAd->execute();
    echo "已新增";
    header("Location:./backstage_index.php");
  } else {
    echo "已有此帳號,請重新輸入";
  }
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
