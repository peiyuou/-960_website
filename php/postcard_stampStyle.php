<?php
try {
  require_once "./connectMySql.php";
  $stampSql = "select * from postcard_material where POS_MAT_PIC like '%stamp%' and POS_MAT_USE =1 limit 3;";

  $stamp = $pdo->query($stampSql);

  if ($stamp->rowCount() == 0) { //找不到
    //傳回空的JSON字串
    echo "{}";
  } else { //找得到
    //取回一筆資料
    $stampRow = $stamp->fetchAll(PDO::FETCH_ASSOC);

    //送出json字串
    echo json_encode($stampRow);
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}
