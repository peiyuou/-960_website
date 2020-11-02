<?php 
	function deep_in_array($search, $array, $index = 0)
	{
		foreach ($array as $value) {
			if (!is_array($value)) {
				$line_check = explode("\t", $value);
				if ($search === $line_check[$index]) {
					return true;
				}
			} else {
				if (deep_in_array($search, $value)) {
					return true;
				}
			}
		}
		return false;
	}
	
	try{
		require_once("./connectMySql.php");
		if( $pdo != false ){
			echo "資料庫連線成功";
			
			$orders = file("管理員.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 管理員.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 管理員.txt 有資料</strong></p>";
				$sql = "select * from `administrator`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->AD_ACCOUNT;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 1)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `administrator`(`AD_NAME`, `AD_ACCOUNT`, `AD_PASSWORD`) values('$line[0]', '$line[1]', '$line[2]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("初始會員.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員.txt 有資料</strong></p>";
				$sql = "select * from `member`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->MEM_EMAIL;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 5)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[5], $re_value)){
							$sql = "insert into `member`(`MEM_NAME`, `MEM_CODE`, `MEM_PIC`, `MEM_TEL`, `MEM_EMAIL`) values('$line[0]', '$line[1]', '$line[2]', '$line[4]', '$line[5]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("industry_class.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 industry_class.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 industry_class.txt 有資料</strong></p>";
				$sql = "select * from `industry_class`";
				echo "搜尋指令為 $sql <br/><br/>";
				$industry_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$industry_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->IND_NO;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 0)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 0; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `industry_class`(`IND_NO`, `IND_CLASS`, `IND_INFO`, `IND_COLOR`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("題目.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 題目.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 題目.txt 有資料</strong></p>";
				$sql = "select * from `quiz`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->	QUIZ_CON;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 1)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `quiz`(`QUIZ_CON`, `QUIZ_SEL_ONE_CONTENT`, `QUIZ_SEL_ONE_CLASS`, `QUIZ_SEL_TWO_CONTENT`, `QUIZ_SEL_TWO_CLASS`, `QUIZ_PIC_ONE`, `QUIZ_PIC_TWO`, `QUIZ_USE`) values('$line[1]', '$line[2]', '$line[3]', '$line[4]', '$line[5]', '$line[6]', '$line[7]', '$line[8]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("職業.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 職業.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 職業.txt 有資料</strong></p>";
				$sql = "select * from `industry_introduce`";
				echo "搜尋指令為 $sql <br/><br/>";
				$industry_introduce_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$industry_introduce_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->IND_INT_NO;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 0)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `industry_introduce`(`IND_INT_NO`, `IND_INT_NAME`, `IND_INT_INTRO`, `IND_INT_PICTURE`, `IND_NO`, `INT_INT_CONTENT`, `IND_INT_SKILL`) values('$line[0]', '$line[1]', '$line[3]', '$line[16]', '$line[2]', '$line[4]', '$line[5]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
				$sql = "select * from `industry_salary`";
				echo "<br/>搜尋指令為 $sql <br/><br/>";
				$industry_introduce_all = $pdo -> query($sql);
				$cehek_value_LOW = Array();
				$cehek_value_HIGH = Array();
				$cehek_value = Array();
				$re_value = Array();
				while($row=$industry_introduce_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_LOW[] = $row->IND_SAL_LOW;
					$cehek_value_HIGH[] = $row->IND_SAL_HIGH;
					$cehek_value[] = $row->IND_INT_NO;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $key => $value){
						$con_num = 0;
						if($con_num != 4){
							$con_num = $con_num + 1;
						}
						else{
							$con_num = 0;
						}
						if(deep_in_array($cehek_value_LOW[$key], $orders, 6+$con_num*2) && deep_in_array($cehek_value_HIGH[$key], $orders, 7+$con_num*2) && deep_in_array($cehek_value[$key], $orders, 0)){
							echo "職業編號為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					$salary_dis = ['不到一年', '一到三年', '三到五年', '五到十年', '十年以上'];
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						for($j = 0; $j < 5; $j++){
							if(!in_array($line[0], $re_value)){
								$index_low = 6 + $j*2;
								$index_high = 7 + $j*2;
								$sql = "insert into `industry_salary`(`IND_SAL_STEP_DISTANCE`, `IND_SAL_LOW`, `IND_SAL_HIGH`, `IND_INT_NO`) values('$salary_dis[$j]', '$line[$index_low]', '$line[$index_high]', '$line[0]')";
								echo "輸入資料指令為 $sql <br/>";
								$pdo -> exec($sql);
								echo "職業編號為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
							}
						}
					}
				}
			}
			
			$orders = file("課程.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 課程.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 課程.txt 有資料</strong></p>";
				$sql = "select * from `skill_class`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->SKI_NAME;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 0)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `skill_class`(`SKI_NAME`, `IND_NO`, `SKI_PRICE`, `SKI_TIME`, `SKI_INTRO`, `SKI_LINK`, `SKI_IMG`, `SKI_TEC_IMG`, `SKI_TEC_NAME`, `SKI_TEC_INTRO`, `SKI_OUTLINE`, `SKI_STUD`, `SKI_HARVEST`) values('$line[0]', '$line[1]', '$line[4]', '$line[3]', '$line[12]', '$line[9]', '$line[10]', '$line[11]', '$line[7]', '$line[8]', '$line[2]', '$line[6]', '$line[5]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("文章.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 文章.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 文章.txt 有資料</strong></p>";
				$sql = "select * from `discuss_area`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->DIS_NAME;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 0)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "INSERT INTO `discuss_area`(`dis_name`, `dis_class`, `ind_no`, `DIS_CONTENT`, `DIS_DATE`, `MEM_NO`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]', '$line[4]', '$line[5]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("留言.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 留言.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 留言.txt 有資料</strong></p>";
				$sql = "select * from `discuss_message`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->DIS_MES_CONTENT;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 1)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "INSERT INTO `discuss_message`(`DIS_NO`, `DIS_MES_CONTENT`, `DIS_MES_DATE`, `MEM_NO`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("初始會員課程收藏.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員課程收藏.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員課程收藏.txt 有資料</strong></p>";
				$sql = "select * from `skill_collect`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_ski = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_ski[] = $row->	SKI_NO;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 1) && deep_in_array($cehek_value_ski[$key], $orders, 0)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `skill_collect`(`MEM_NO`, `SKI_NO`) values('$line[1]', '$line[0]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("初始會員文章收藏.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員文章收藏.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員文章收藏.txt 有資料</strong></p>";
				$sql = "select * from `article_collect`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_ski = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_ski[] = $row->	DIS_NO;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 1) && deep_in_array($cehek_value_ski[$key], $orders, 0)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `article_collect`(`MEM_NO`, `DIS_NO`) values('$line[1]', '$line[0]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							$sql_calc = "update `discuss_area` set `DIS_COL_NUM` = `DIS_COL_NUM` + 1 where `DIS_NO` = '$line[0]'";
							echo "輸入收藏資料指令為 $sql_calc <br/>";
							$pdo -> exec($sql_calc);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("初始會員文章喜歡.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員文章喜歡.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員文章喜歡.txt 有資料</strong></p>";
				$sql = "select * from `article_like`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_ski = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_ski[] = $row->	DIS_NO;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 1) && deep_in_array($cehek_value_ski[$key], $orders, 0)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `article_like`(`MEM_NO`, `DIS_NO`) values('$line[1]', '$line[0]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							$sql_calc = "update `discuss_area` set `DIS_LIK_NUM` = `DIS_LIK_NUM` + 1 where `DIS_NO` = '$line[0]'";
							echo "輸入收藏資料指令為 $sql_calc <br/>";
							$pdo -> exec($sql_calc);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
				
			}
			
			$orders = file("公告文章.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 公告文章.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 公告文章.txt 有資料</strong></p>";
				$sql = "select * from `announcement`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->ANN_CONTENT;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 0)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "INSERT INTO `announcement`(`ANN_CONTENT`, `ANN_DATE`, `ANN_USE`) values('$line[0]', '$line[1]', '$line[2]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員留言喜歡.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員留言喜歡.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員留言喜歡.txt 有資料</strong></p>";
				$sql = "select * from `message_like`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_ski = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_ski[] = $row->	DIS_MES_NO;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 1) && deep_in_array($cehek_value_ski[$key], $orders, 0)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `message_like`(`MEM_NO`, `DIS_MES_NO`) values('$line[1]', '$line[0]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							$sql_calc = "update `discuss_message` set `DIS_MES_LIK_NUM` = `DIS_MES_LIK_NUM` + 1 where `DIS_MES_NO` = '$line[0]'";
							echo "輸入收藏資料指令為 $sql_calc <br/>";
							$pdo -> exec($sql_calc);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員分析結果.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員分析結果.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員分析結果.txt 有資料</strong></p>";
				$sql = "select * from `quiz_result_analysis`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_date = Array();
				$cehek_value_fit = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_date[] = $row-> QUIZ_RES_DATE;
					$cehek_value_fit[] = $row-> QUIZ_RES_FIT_TYPE;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 0) && deep_in_array($cehek_value_date[$key], $orders, 7) && deep_in_array($cehek_value_fit[$key], $orders, 8)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `quiz_result_analysis`(`MEM_NO`, `QUIZ_RES_TYPE_R`, `QUIZ_RES_TYPE_I`, `QUIZ_RES_TYPE_A`, `QUIZ_RES_TYPE_S`, `QUIZ_RES_TYPE_E`, `QUIZ_RES_TYPE_C`, `QUIZ_RES_DATE`, `QUIZ_RES_FIT_TYPE`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]', '$line[4]', '$line[5]', '$line[6]', '$line[7]', '$line[8]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員訂單.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員訂單.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員訂單.txt 有資料</strong></p>";
				$sql = "select * from `order_mem`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_date = Array();
				$cehek_value_fit = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_amount[] = $row-> ORD_AMOUNT;
					$cehek_value_date[] = $row-> ORD_DATE;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 0) && deep_in_array($cehek_value_amount[$key], $orders, 2) && deep_in_array($cehek_value_date[$key], $orders, 4)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `order_mem`(`MEM_NO`, `ORD_DISCOUNT`, `ORD_AMOUNT`, `ORD_PAY`, `ORD_DATE`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]', '$line[4]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員訂單明細.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員訂單明細.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員訂單明細.txt 有資料</strong></p>";
				$sql = "select * from `order_detail`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_ord = Array();
				$cehek_value_ski = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_ord[] = $row->	ORD_NO;
					$cehek_value_ski[] = $row-> SKI_NO;
				}
				if($cehek_value_ord != 0){
					foreach($cehek_value_ord as $key => $value){
						if(deep_in_array($cehek_value_ord[$key], $orders, 0) && deep_in_array($cehek_value_ski[$key], $orders, 1)){
							echo "主鍵值為".$cehek_value_ord[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `order_detail`(`ORD_NO`, `SKI_NO`, `ORD_DET_PRICE`) values('$line[0]', '$line[1]', '$line[2]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							$sql_calc = "update `skill_class` set `SKI_BUY_NUM` = `SKI_BUY_NUM` + 1 where `SKI_NO` = '$line[1]'";
							echo "輸入收藏資料指令為 $sql_calc <br/>";
							$pdo -> exec($sql_calc);
							echo "主鍵值為".$line[0]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員文章檢舉.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員文章檢舉.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員文章檢舉.txt 有資料</strong></p>";
				$sql = "select * from `article_report`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_dis = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_dis[] = $row->	DIS_NO;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 1) && deep_in_array($cehek_value_dis[$key], $orders, 0)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `article_report`(`DIS_NO`, `MEM_NO`, `ART_REP_CONTENT`, `ART_REP_PASS`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							$sql_calc = "update `discuss_area` set `DIS_REP_NUM` = `DIS_REP_NUM` + 1 where `DIS_NO` = '$line[0]'";
							echo "輸入收藏資料指令為 $sql_calc <br/>";
							$pdo -> exec($sql_calc);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員留言檢舉.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員留言檢舉.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員留言檢舉.txt 有資料</strong></p>";
				$sql = "select * from `message_report`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_dis = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_dis[] = $row->	DIS_MES_NO;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 1) && deep_in_array($cehek_value_dis[$key], $orders, 0)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "insert into `message_report`(`DIS_MES_NO`, `MEM_NO`, `MES_REP_CONTENT`, `MES_REP_PASS`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							$sql_calc = "update `discuss_message` set `DIS_MES_REP_NUM` = `DIS_MES_REP_NUM` + 1 where `DIS_MES_NO` = '$line[0]'";
							echo "輸入收藏資料指令為 $sql_calc <br/>";
							$pdo -> exec($sql_calc);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("明信片素材.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 明信片素材.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 明信片素材.txt 有資料</strong></p>";
				$sql = "select * from `postcard_material`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value[] = $row->POS_MAT_PIC;
				}
				if($cehek_value != 0){
					foreach($cehek_value as $value){
						if(deep_in_array($value, $orders, 1)){
							echo "主鍵值為".$value."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[1], $re_value)){
							$sql = "INSERT INTO `postcard_material`(`POS_MAT_NAME`, `POS_MAT_PIC`, `POS_MAT_USE`) values('$line[0]', '$line[1]', '$line[2]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
			
			$orders = file("初始會員明信片.txt");
			$number_of_orders = count($orders);
			
			if ($number_of_orders == 0){
				echo "<p><strong>檔案 初始會員明信片.txt 無資料</strong></p>";
			}
			else{
				echo "<p><strong>檔案 初始會員明信片.txt 有資料</strong></p>";
				$sql = "select * from `postcard`";
				echo "搜尋指令為 $sql <br/><br/>";
				$skill_class_all = $pdo -> query($sql);
				$cehek_value_mem = Array();
				$cehek_value_dis = Array();
				$re_value = Array();
				while($row=$skill_class_all->fetch(PDO::FETCH_OBJ)){
					$cehek_value_mem[] = $row->	MEM_NO;
					$cehek_value_dis[] = $row->	POS_CRE_DATE;
				}
				if($cehek_value_mem != 0){
					foreach($cehek_value_mem as $key => $value){
						if(deep_in_array($cehek_value_mem[$key], $orders, 0) && deep_in_array($cehek_value_dis[$key], $orders, 3)){
							echo "主鍵值為".$cehek_value_mem[$key]."的資料已存入資料庫，勿重複輸入！<br/>";
							$re_value[] = $value;
						}
					}
					
					for($i = 1; $i < $number_of_orders; $i++){
						$line = explode("\t", $orders[$i]);
						if(!in_array($line[0], $re_value)){
							$sql = "insert into `postcard`(`MEM_NO`, `POS_PIC`, `POS_PIC_BACK`, `POS_CRE_DATE`, `POS_SEN_DATE`) values('$line[0]', '$line[1]', '$line[2]', '$line[3]', '$line[4]')";
							echo "輸入資料指令為 $sql <br/>";
							$pdo -> exec($sql);
							echo "主鍵值為".$line[1]."的資料已成功存入資料庫！<br/><br/>";
						}
					}
				}
			}
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	}
?>