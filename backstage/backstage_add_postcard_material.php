<?php
try {

  require_once("./connectMySql.php");

  $addPost = "insert into postcard_material (POS_MAT_NAME,POS_MAT_PIC,POS_MAT_USE)
values(:POS_MAT_NAME,:POS_MAT_PIC,'1');";

  if ($_POST['post_type'] == "outline") {
    $postFileSrc = "./img/post_card/a_outline{$_FILES["POS_MAT_PIC"]["name"]}";
  } elseif ($_POST['post_type'] == "stamp") {
    $postFileSrc = "./img/post_card/b_stamp{$_FILES["POS_MAT_PIC"]["name"]}";
  } else {
    $postFileSrc = "./img/post_card/b_postmark{$_FILES["POS_MAT_PIC"]["name"]}";
  };

  $from = $_FILES["POS_MAT_PIC"]["tmp_name"];
  $to = $postFileSrc;
  copy($from, $to);


  $insertPost = $pdo->prepare($addPost);
  $insertPost->bindValue(":POS_MAT_NAME", $_POST["POS_MAT_NAME"]);
  $insertPost->bindValue(":POS_MAT_PIC", $postFileSrc);
  $insertPost->execute();
  echo "已成功新增";
  header("Location:./backstage_index.php");
  // } else {
  //   echo "已有此帳號,請重新輸入";
  // }
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
