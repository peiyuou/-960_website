<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){
            $dirpath = realpath(dirname(getcwd()));
            $imgType = explode(".", $_FILES["imageStore"]['name'])[1];
            $time = time();
            $filename = "\img\member\member_Img\\".$time.".".$imgType;
            $filenameSend = "./img/member/member_Img/".$time.".".$imgType;
            move_uploaded_file($_FILES["imageStore"]["tmp_name"],$dirpath.$filename);
            
            $sql = "update `member` set MEM_PIC = :MEM_PIC where MEM_NO = :memNo";
            $memberDataAll = $pdo -> prepare($sql);
            $memberDataAll -> bindValue(":MEM_PIC",$filenameSend);
            $memberDataAll -> bindValue(":memNo",$_POST["memNo"]);
            $memberDataAll -> execute();
        }
    }catch(PDOException $e){
    }
?>