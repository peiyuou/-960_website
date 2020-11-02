<?php
    session_start();
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            $sql = "select a.ski_no , 
            a.ski_name,
            a.ski_img,
            a.ski_buy_num,
            a.ski_time,
            a.ski_price,
            b.ind_class,
            b.ind_color,
            b.ind_no
            from skill_class a join industry_class b on a.ind_no = b.ind_no
            where a.ind_no = (select ind_no from skill_class where ski_no = :SKI_NO) and not(ski_hidden = 0);";
            $disAll = $pdo -> prepare($sql);
            // $disAll -> bindValue(":SKI_NO",4);
            $disAll -> bindValue(":SKI_NO",$_POST["introduce_no"]);
            $disAll -> execute();
            if($disAll -> rowCount() == 0){
                echo 0;
            }
            else{
                $disRow = $disAll->fetchAll(PDO::FETCH_ASSOC);
                //送出json字串
                echo json_encode($disRow);
            }
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>