<?php

try {
  require_once "./connectMySql.php";

  $sql = "select * from industry_introduce where IND_INT_NAME=:IND_INT_NAME";
  $ind = $pdo->prepare($sql);
  $ind->bindValue(":IND_INT_NAME", $_POST["ind_int_name"]);
  $ind->execute();
  // echo 1;
  $fromIndPic = $_FILES["ind_int_picture"]["tmp_name"];
  $toIndPic = "./img/career/{$_FILES["ind_int_picture"]["name"]}";
  copy($fromIndPic, $toIndPic);

  if ($ind->rowCount() == 0) {

    $addInd = "INSERT INTO `industry_introduce`
           (IND_INT_NAME,
            IND_INT_INTRO,
            IND_INT_PICTURE,
            IND_NO,
            INT_INT_CONTENT,
            IND_INT_SKILL)
            VALUES 
            (:IND_INT_NAME,
            :IND_INT_INTRO,
            :IND_INT_PICTURE,
            :IND_NO,
            :INT_INT_CONTENT,
            :IND_INT_SKILL);";
    $insertInd = $pdo->prepare($addInd);
    $insertInd->bindValue(":IND_INT_NAME", $_POST["ind_int_name"]);
    $insertInd->bindValue(":IND_INT_INTRO", $_POST["ind_int_intro"]);
    $insertInd->bindValue(":IND_INT_PICTURE", $toIndPic);
    $insertInd->bindValue(":IND_NO", $_POST["ind_no"]);
    $insertInd->bindValue(":INT_INT_CONTENT", $_POST["ind_int_content"]);
    $insertInd->bindValue(":IND_INT_SKILL", $_POST["ind_int_skill"]);
    $insertInd->execute();


    // $count = "SELECT round(count(IND_INT_NO)/5+1) FROM industry_salary;";
    // $countNum = $pdo->prepare($count);
    // $countNum->execute();

    $addSal = "
    insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values('不到一年',:IND_SAL_LOW1,:IND_SAL_HIGH1,:IND_INT_NO);
    insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values('一到三年',:IND_SAL_LOW2,:IND_SAL_HIGH2,:IND_INT_NO);
    insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values('三到五年',:IND_SAL_LOW3,:IND_SAL_HIGH3,:IND_INT_NO);
    insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values('五到十年',:IND_SAL_LOW4,:IND_SAL_HIGH4,:IND_INT_NO);
    insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values('十年以上',:IND_SAL_LOW5,:IND_SAL_HIGH5,:IND_INT_NO);";
    $insertSal = $pdo->prepare($addSal);
    $insertSal->bindValue(":IND_INT_NO", $_POST["IND_INT_NO"]);
    $insertSal->bindValue(":IND_SAL_LOW1", $_POST["IND_SAL_LOW1"]);
    $insertSal->bindValue(":IND_SAL_LOW2", $_POST["IND_SAL_LOW2"]);
    $insertSal->bindValue(":IND_SAL_LOW3", $_POST["IND_SAL_LOW3"]);
    $insertSal->bindValue(":IND_SAL_LOW4", $_POST["IND_SAL_LOW4"]);
    $insertSal->bindValue(":IND_SAL_LOW5", $_POST["IND_SAL_LOW5"]);

    $insertSal->bindValue(":IND_SAL_HIGH1", $_POST["IND_SAL_HIGH1"]);
    $insertSal->bindValue(":IND_SAL_HIGH2", $_POST["IND_SAL_HIGH2"]);
    $insertSal->bindValue(":IND_SAL_HIGH3", $_POST["IND_SAL_HIGH3"]);
    $insertSal->bindValue(":IND_SAL_HIGH4", $_POST["IND_SAL_HIGH4"]);
    $insertSal->bindValue(":IND_SAL_HIGH5", $_POST["IND_SAL_HIGH5"]);
    $insertSal->execute();
    header("Location:./backstage_index.php");
  } else {
    // header("Location:/backstage_index.php");
    echo '此行業已存在 請重新輸入';
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}
// insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values("不到一年",3000,5000,25);
// insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values("一到三年",3001,5001,25);
// insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values("三到五年",3002,5002,25);
// insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values("五到十年",3003,5003,25);
// insert into industry_salary(IND_SAL_STEP_DISTANCE,IND_SAL_LOW ,IND_SAL_HIGH,IND_INT_NO)values("十年以上",3004,5004,25);