<?php
try {
  require_once("./connectMySql.php");
  $ord = "select * from ORDER_MEM where ORD_NO = :ORD_NO";
  $ordAll = $pdo->prepare($ord);
  $ordAll->bindValue(":ORD_NO", $_POST["ORD_NO"]);
  $ordAll->execute();
  if ($ordAll->rowCount() == 0) {
    echo "查無此訂單資料";
  } else {
    $ordSearchSql = "select o.*, s.SKI_NAME, s.SKI_TEC_NAME from order_detail o join skill_class s on s.SKI_NO = o.SKI_NO where o.ORD_NO=:ORD_NO;";
    $ordSearch = $pdo->prepare($ordSearchSql);
    $ordSearch->bindValue(":ORD_NO", $_POST["ORD_NO"]);
    $ordSearch->execute();
    echo "

           <tr>
              <th>訂單編號</th>
              <th>課程編號</th>
              <th>課程名稱</th>
              <th>講師</th>
              <th>價格</th>
            </tr>";
    while ($ordSearchRow = $ordSearch->fetch(PDO::FETCH_ASSOC)) {
      echo "   
            <tr>
              <td>" . $ordSearchRow["ORD_NO"] . "</td>
              <td>" . $ordSearchRow["SKI_NO"] . "</td>
              <td>" . $ordSearchRow["SKI_NAME"] . "</td>
              <td>" . $ordSearchRow["SKI_TEC_NAME"] . "</td>
              <td>" . $ordSearchRow["ORD_DET_PRICE"] . "</td>
      
            </tr>";
    }
  }
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
