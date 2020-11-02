<?php
try {
  require_once "./connectMySql.php";
  $outlineSql = "select * from postcard_material where POS_MAT_PIC like '%outline%' and POS_MAT_USE =1
  limit 3;";

  $outline = $pdo->query($outlineSql);

  if ($outline->rowCount() == 0) { //找不到
    //傳回空的JSON字串
    echo "{}";
  } else { //找得到
    //取回一筆資料
    $outlineRow = $outline->fetchAll(PDO::FETCH_ASSOC);

    //送出json字串
    echo json_encode($outlineRow);
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}
