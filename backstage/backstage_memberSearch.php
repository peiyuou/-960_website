<?php
try {
  require_once("./connectMySql.php");
  // 抓管理員資料
  $memSearchSql = "select * from `member` where MEM_NO = :MEM_NO";
  $memSearch = $pdo->prepare($memSearchSql);
  $memSearch->bindValue(":MEM_NO", $_POST["MEM_NO"]);
  $memSearch->execute(); //執行

  if ($memSearch->rowCount() == 0) { //找不到
    echo "查無此會員";
  } else {
    $memSearchRow = $memSearch->fetch(PDO::FETCH_ASSOC);
    //登入成功,將登入者的資料寫入session

    if ($memSearchRow['MEM_USE'] == 0) {
      $MEMUSE = "否";
      echo " <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>電話</th>
              <th>電子郵件</th>
              <th>是否停權</th>
              <th>修改</th>
            </tr>
            <tr>
              <td>" . $memSearchRow['MEM_NO'] . "</td>
              <td>" . $memSearchRow['MEM_NAME'] . "</td>
              <td>" . $memSearchRow['MEM_TEL'] . "</td>
              <td>" . $memSearchRow['MEM_EMAIL'] . "</td>
              <td>
                <p>" . $MEMUSE  . "<p>
                <select name='authority' class='editShow MEM_USE'>
                <option value='1'>是</option>
                <option value='0' selected>否</option>
                </select>
              </td>
                <td>
                  <button class='edit memberEdit'>確認</button>
                </td>
            </tr>";
    } else {
      $MEMUSE = "是";
      echo " <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>電話</th>
              <th>電子郵件</th>
              <th>是否停權</th>
              <th>修改</th>
            </tr>
            <tr>
              <td>" . $memSearchRow['MEM_NO'] . "</td>
              <td>" . $memSearchRow['MEM_NAME'] . "</td>
              <td>" . $memSearchRow['MEM_TEL'] . "</td>
              <td>" . $memSearchRow['MEM_EMAIL'] . "</td>
              <td>
                <p>" . $MEMUSE  . "<p>
                <select name='authority' class='editShow MEM_USE'>
                <option value='1' selected>是</option>
                <option value='0'>否</option>
                </select>
              </td>
              <td>
                  <button class='edit memberEdit'>確認</button>
                </td>
            </tr>";
    }


    // echo $memSearchRow["MEM_USE"] == 1 ? "selected" : "";
    // echo $memSearchRow["MEM_USE"] == 0 ? "selected" : "";
  }
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
