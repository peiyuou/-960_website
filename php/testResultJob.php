<?php 
try{

require_once "./connectMySql.php";
$JobDataSql = " SELECT `IND_INT_NAME`, IND_INT_NO, `IND_INT_PICTURE`, `IND_NO` FROM `industry_introduce` where `IND_NO` = :IND_NO ";
// $anaDataSql = " select  IND_NO, IND_CLASS, IND_INFO from `industry_class` where IND_NO = :IND_NO";
$JobData = $pdo ->prepare($JobDataSql);
// $JobData = $pdo ->query($JobDataSql);
$JobData ->bindValue(":IND_NO",$_POST["userType"]);
$JobData ->execute();

if($JobData->rowCount() == 0) { 
    echo "{123}";
    } else { 
        $JobDataRow = $JobData->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($JobDataRow);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}

?>