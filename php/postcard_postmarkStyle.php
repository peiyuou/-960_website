<?php
try {
  require_once "./connectMySql.php";
  $postmarkSql = "select * from postcard_material where POS_MAT_PIC like '%postmark%' and POS_MAT_USE =1 limit 3;";

  $postmark = $pdo->query($postmarkSql);

  if ($postmark->rowCount() == 0) { //找不到
    //傳回空的JSON字串
    echo "{}";
  } else { //找得到
    //取回一筆資料
    $postmarkRow = $postmark->fetchAll(PDO::FETCH_ASSOC);

    //送出json字串
    echo json_encode($postmarkRow);
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}
