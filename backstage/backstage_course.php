<?php

try {
  require_once("./connectMySql.php");
  $courseUp = json_decode($_POST["skillJson"], true);
  //圖片一解碼

  $couImgUpdate = str_replace('data:image/png;base64,', '', $courseUp["skiImgInput"]);
  $couImgUpdate = str_replace(' ', '+', $couImgUpdate);
  $couImgData = base64_decode($couImgUpdate);
  $couImgFilename = "./img/career/{$courseUp['skiImgInput_name']}";
  file_put_contents($couImgFilename, $couImgData);

  $couTecImgUpdate = str_replace('data:image/png;base64,', '', $courseUp["skiTecImgInput"]);
  $couTecImgUpdate = str_replace(' ', '+', $couTecImgUpdate);
  $couTecImgData = base64_decode($couTecImgUpdate);
  $couTecImgFilename = "./img/career/{$courseUp['skiTecImgInput_name']}";
  file_put_contents($couTecImgFilename, $couTecImgData);



  // 修改測驗題庫資料
  $courseSql = "update SKILL_CLASS set SKI_NAME = :SKI_NAME, 
  IND_NO = :skiType, SKI_PRICE = :SKI_PRICE,
  SKI_TIME=:SKI_TIME, 
  SKI_INTRO = :SKI_INTRO, 
  SKI_HARVEST = :SKI_HARVEST, 
  SKI_LINK = :SKI_LINK, SKI_IMG = :SKI_IMG, 
  SKI_TEC_IMG=:SKI_TEC_IMG, SKI_TEC_NAME=:SKI_TEC_NAME, 
  SKI_TEC_INTRO=:SKI_TEC_INTRO, SKI_OUTLINE=:SKI_OUTLINE, 
  SKI_STUD=:SKI_STUD, SKI_HIDDEN = :SKI_HIDDEN where SKI_NO = :SKI_NO";



  $course = $pdo->prepare($courseSql);

  // exit();
  $course->bindValue(":SKI_NAME", $courseUp["ski_name"]);
  $course->bindValue(":skiType", $courseUp["skiType"]);
  $course->bindValue(":SKI_PRICE", $courseUp["ski_price"]);
  $course->bindValue(":SKI_TIME", $courseUp["ski_time"]);
  $course->bindValue(":SKI_HARVEST", $courseUp["ski_harvest"]);
  $course->bindValue(":SKI_INTRO", $courseUp["ski_intro"]);
  $course->bindValue(":SKI_LINK", $courseUp["ski_link"]);
  $course->bindValue(":SKI_IMG", $couImgFilename);
  $course->bindValue(":SKI_TEC_IMG", $couTecImgFilename);
  $course->bindValue(":SKI_TEC_INTRO", $courseUp["ski_tec_intro"]);
  $course->bindValue(":SKI_TEC_NAME", $courseUp["ski_tec_name"]);
  $course->bindValue(":SKI_OUTLINE", $courseUp["ski_outline"]);
  $course->bindValue(":SKI_STUD", $courseUp["ski_stud"]);
  $course->bindValue(":SKI_NO", $courseUp["skiNo"]);
  $course->bindValue(":SKI_HIDDEN", $courseUp["skill_USE"]);
  // echo $courseUp["skill_USE"];
  // die;
  $course->execute(); //執行
  echo "已成功修改";
  header("Location:./backstage_index.php");
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
