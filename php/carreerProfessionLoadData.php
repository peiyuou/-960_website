<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){

            if($_POST["proNo_2_Use"] == 0){
                $sql = "select industry_class.IND_NO '類型編號', industry_class.IND_CLASS '類型名稱', industry_class.IND_COLOR '類型顏色', industry_introduce.IND_INT_NO '職業編號', industry_introduce.IND_INT_NAME '職業名稱', industry_introduce.IND_INT_PICTURE '職業圖片', industry_introduce.IND_INT_INTRO '職業介紹', industry_introduce.INT_INT_CONTENT '職業內容', industry_introduce.IND_INT_SKILL '職業技能' from `industry_introduce` join `industry_class` on industry_introduce.ind_no = industry_class.ind_no where industry_introduce.IND_INT_NO = :proNo_1 group by industry_class.IND_NO, industry_introduce.IND_INT_NO";
                $ProfessionSelect = $pdo -> prepare($sql);
                $ProfessionSelect -> bindValue(":proNo_1",$_POST["proNo_1"]);
                $sqlSalary = "select industry_class.IND_NO '類型編號', industry_class.IND_CLASS '類型名稱', industry_introduce.IND_INT_NO '職業編號', industry_introduce.IND_INT_NAME '職業名稱', industry_salary.IND_SAL_STEP_DISTANCE '年資', industry_salary.IND_SAL_LOW '最低薪資', industry_salary.IND_SAL_HIGH '最高薪資' from `industry_introduce` join `industry_class` on industry_introduce.ind_no = industry_class.ind_no join `industry_salary` on industry_introduce.IND_INT_NO = industry_salary.IND_INT_NO where industry_introduce.IND_INT_NO = :proNo_1 group by industry_class.IND_NO, industry_introduce.IND_INT_NO, industry_salary.IND_SAL_NO";
                $ProfessionSalary = $pdo -> prepare($sqlSalary);
                $ProfessionSalary -> bindValue(":proNo_1",$_POST["proNo_1"]);
            }
            else{
                $sql = "select industry_class.IND_NO '類型編號', industry_class.IND_CLASS '類型名稱', industry_class.IND_COLOR '類型顏色', industry_introduce.IND_INT_NO '職業編號', industry_introduce.IND_INT_NAME '職業名稱', industry_introduce.IND_INT_PICTURE '職業圖片', industry_introduce.IND_INT_INTRO '職業介紹', industry_introduce.INT_INT_CONTENT '職業內容', industry_introduce.IND_INT_SKILL '職業技能' from `industry_introduce` join `industry_class` on industry_introduce.ind_no = industry_class.ind_no where industry_introduce.IND_INT_NO in (:proNo_1, :proNo_2) group by industry_class.IND_NO, industry_introduce.IND_INT_NO";
                $ProfessionSelect = $pdo -> prepare($sql);
                $ProfessionSelect -> bindValue(":proNo_1",$_POST["proNo_1"]);
                $ProfessionSelect -> bindValue(":proNo_2",$_POST["proNo_2"]);
                $sqlSalary = "select industry_class.IND_NO '類型編號', industry_class.IND_CLASS '類型名稱', industry_introduce.IND_INT_NO '職業編號', industry_introduce.IND_INT_NAME '職業名稱', industry_salary.IND_SAL_STEP_DISTANCE '年資', industry_salary.IND_SAL_LOW '最低薪資', industry_salary.IND_SAL_HIGH '最高薪資' from `industry_introduce` join `industry_class` on industry_introduce.ind_no = industry_class.ind_no join `industry_salary` on industry_introduce.IND_INT_NO = industry_salary.IND_INT_NO where industry_introduce.IND_INT_NO in (:proNo_1, :proNo_2) group by industry_class.IND_NO, industry_introduce.IND_INT_NO, industry_salary.IND_SAL_NO";
                $ProfessionSalary = $pdo -> prepare($sqlSalary);
                $ProfessionSalary -> bindValue(":proNo_1",$_POST["proNo_1"]);
                $ProfessionSalary -> bindValue(":proNo_2",$_POST["proNo_2"]);
            }
            $ProfessionSelect -> execute();
            $ProfessionSalary -> execute();
            if($ProfessionSelect -> rowCount() == 0){
                echo "沒資料";
            }
            else{
                $check_value = Array();
                $check_valuerr = Array();
                $ProfessionSelect_row=$ProfessionSelect->fetchAll(PDO::FETCH_ASSOC);
                $ProfessionSalary_row=$ProfessionSalary->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($ProfessionSelect_row);
                echo json_encode($ProfessionSalary_row);
            }
        }
    }catch(PDOException $e){
    }
?>