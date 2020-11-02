<?php

// 課程要撈 課程編號 類型 課程明稱 課程圖片 購買人數 時數 價格 顏色

try {
require_once "./connectMySql.php";


// $relatedCourseSql = " select SKI_NAME, SKI_BUY_NUM,IND_NO, SKI_PRICE,SKI_TIME, SKI_IMG FROM `skill_class` where IND_NO = :IND_NO ;";
$relatedCourseSql = " select skill_class.SKI_NAME, skill_class.SKI_BUY_NUM, skill_class.SKI_PRICE,skill_class.SKI_TIME,skill_class.SKI_NO, skill_class.SKI_IMG,industry_class.IND_CLASS, industry_class.IND_COLOR FROM skill_class JOIN industry_class ON skill_class.IND_NO = industry_class.IND_NO WHERE industry_class.IND_NO = :IND_NO ";
$relatedCourseData = $pdo ->prepare($relatedCourseSql);
$relatedCourseData ->bindValue(":IND_NO",$_POST["userType"]);
$relatedCourseData ->execute();
// $relatedCourseData = $pdo ->QUERY($relatedCourseSql);

    if ($relatedCourseData->rowCount() == 0) { 
        echo "{123}";

    } else { 
      
        $relatedCourseDataRow = $relatedCourseData->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($relatedCourseDataRow);
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>