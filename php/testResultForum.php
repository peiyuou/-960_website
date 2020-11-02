<?php 
try{

require_once "./connectMySql.php";
$relatedDiscussSql = "select member.MEM_NO, member.MEM_NAME, member.MEM_PIC, discuss_area.DIS_NO, discuss_area.DIS_NAME, discuss_area.DIS_CLASS, industry_class.IND_CLASS, discuss_area.DIS_CONTENT , discuss_area.DIS_DATE, discuss_area.DIS_HIDDEN, industry_class.IND_COLOR FROM `discuss_area` JOIN industry_class ON discuss_area.IND_NO = industry_class.IND_NO JOIN member ON discuss_area.MEM_NO = member.MEM_NO where industry_class.IND_NO = :IND_NO";
// $relatedDiscussSql = "select DIS_NAME, DIS_CLASS, IND_NO FROM `discuss_area` where IND_NO = :IND_NO ;";
$relatedDiscussData = $pdo->prepare($relatedDiscussSql);
$relatedDiscussData ->bindValue(":IND_NO",$_POST["userType"]);
$relatedDiscussData ->execute();
// $relatedDiscussData = $pdo->QUERY($relatedDiscussSql);

if ($relatedDiscussData->rowCount() == 0) { 
    echo "{123}";
} else { 
    $relatedDiscussData = $relatedDiscussData->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($relatedDiscussData);
}
}catch(PDOException $e){
    echo $e->getMessage();
}

?>