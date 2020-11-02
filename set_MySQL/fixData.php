<?php 
	try{
		require_once("./connectMySql.php");
		if( $pdo != false ){
			echo "資料庫連線成功";
			
			$sql = "update `industry_salary` set IND_SAL_LOW = 28674, IND_SAL_HIGH = 30663 where IND_INT_NO = 24 and IND_SAL_STEP_DISTANCE = '不到一年'";
            $fixData = $pdo -> prepare($sql);
            $fixData -> execute();
			$sql = "update `industry_salary` set IND_SAL_LOW = 31260, IND_SAL_HIGH = 33989 where IND_INT_NO = 24 and IND_SAL_STEP_DISTANCE = '一到三年'";
            $fixData = $pdo -> prepare($sql);
            $fixData -> execute();
			$sql = "update `industry_salary` set IND_SAL_LOW = 33676, IND_SAL_HIGH = 37819 where IND_INT_NO = 24 and IND_SAL_STEP_DISTANCE = '三到五年'";
            $fixData = $pdo -> prepare($sql);
            $fixData -> execute();
			$sql = "update `industry_salary` set IND_SAL_LOW = 36234, IND_SAL_HIGH = 42429 where IND_INT_NO = 24 and IND_SAL_STEP_DISTANCE = '五到十年'";
            $fixData = $pdo -> prepare($sql);
            $fixData -> execute();
			$sql = "update `industry_salary` set IND_SAL_LOW = 39272, IND_SAL_HIGH = 43680 where IND_INT_NO = 24 and IND_SAL_STEP_DISTANCE = '十年以上'";
            $fixData = $pdo -> prepare($sql);
            $fixData -> execute();
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}
?>