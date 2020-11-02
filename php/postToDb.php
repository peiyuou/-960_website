<?php
session_start();
try {
  $postCard = json_decode($_POST["json"], true);
  // $postCard = json_decode('{"frontImg":"./uploads/1600252482.png","backImg":"./uploads/1600252495.png","senDate":"2020-09-16"}', true);

  require_once "connectMySql.php";


  $sql2 = "INSERT INTO `postcard` (`MEM_NO`, `POS_PIC`, `POS_PIC_BACK`, `POS_CRE_DATE`, `POS_SEN_DATE`) VALUES
  ('{$_SESSION["memNo"]}', '{$postCard["frontImg"]}', '{$postCard["backImg"]}', curdate(), '{$postCard["senDate"]}')";
  $postcard = $pdo->exec($sql2);
  // exit($Sql2);

  // $sql = "INSERT INTO `postcard` (`MEM_NO`, `POS_PIC`, `POS_PIC_BACK`, `POS_CRE_DATE`, `POS_SEN_DATE`) VALUES
  // (:MEM_NO, :POS_PIC, :POS_PIC_BACK, curdate(), :POS_SEN_DATE)";


  // $postcard = $pdo->prepared($sql);
  // $postcard->bindValue(":POS_PIC", $postCard["frontImg"]);
  // $postcard->bindValue(":POS_PIC_BACK", $postCard["backImg"]);
  // $postcard->bindValue(":POS_SEN_DATE", $postCard["senDate"]);
  // $postcard->bindValue(":MEM_NO", $_SESSION["memNo"]);
  // $postcard->execute();

  // echo "OK";
} catch (PDOException $e) {
  echo $e->getMessage();
}
