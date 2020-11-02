<?php
try {
    require_once "connectMySql.php";
    $salStageSql = "select industry_introduce.IND_INT_NAME '職業名稱', INDUSTRY_INTRODUCE.IND_INT_PICTURE 'img',IND_SAL_STEP_DISTANCE '薪資區間', round((IND_SAL_LOW+IND_SAL_HIGH)/2) '薪資平均' FROM `industry_salary` join `industry_introduce` on industry_salary.IND_INT_NO = industry_introduce.IND_INT_NO WHERE `IND_SAL_STEP_DISTANCE` = '三到五年' order by (IND_SAL_LOW+IND_SAL_HIGH)/2 desc limit 3";
    $salStage = $pdo->query($salStageSql);

    if ($salStage->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $salStageRow = $salStage->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($salStageRow);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>