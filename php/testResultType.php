<?php 
try{

require_once "./connectMySql.php";
$anaDataSql = " select IND_CLASS, IND_INFO, IND_COLOR from `industry_class` where IND_NO = :IND_NO ";
// $anaDataSql = " select  IND_NO, IND_CLASS, IND_INFO from `industry_class` where IND_NO = :IND_NO";
$anaData = $pdo ->prepare($anaDataSql);
// $anaData = $pdo ->query($anaDataSql);
$anaData ->bindValue(":IND_NO",$_POST["userType"]);
$anaData ->execute();

if($anaData->rowCount() == 0) { 
    echo "{123}";
    } else { 
        $anaDataRow = $anaData->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($anaDataRow);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}

?>