<?php
// './img/course/course_img/A/講師照片-設計色彩學：建立自己的色彩品味資料庫.jpeg'
try {
    require_once "./connectMySql.php";
    $fromPicTec = $_FILES["ski_tec_img"]["tmp_name"];
    $toPicTec = "./img/course/course_img/{$_POST["ind_no"]}/{$_FILES["ski_tec_img"]["name"]}";
    // $toPicTec = `./img/course/course_img/{$_FILES["ski_tec_img"]["name"]}`;
    copy($fromPicTec, $toPicTec);
    $fromPicSki = $_FILES["ski_img"]["tmp_name"];
    $toPicSki = "./img/course/course_img/{$_POST["ind_no"]}/{$_FILES["ski_img"]["name"]}";
    // $toPicSki = "./img/course/course_img/{$_FILES["ski_img"]["name"]}";
    copy($fromPicSki, $toPicSki);
    if ($pdo != false) {
        // insert into order_mem
        $sql = "INSERT INTO `skill_class` (ski_name,
    ind_no,
    -- ski_buy_num,
    ski_price,
    ski_time,
    ski_intro,
    ski_harvest,
    ski_link,
    ski_img,
    ski_tec_img,
    ski_tec_name,
    ski_tec_intro,
    ski_outline,
    ski_stud,
    ski_hidden
            )VALUES (:ski_name,
    :ind_no,
    -- :ski_buy_num,
    :ski_price,
    :ski_time,
    :ski_intro,
    :ski_harvest,
    :ski_link,
    :ski_img,
    :ski_tec_img,
    :ski_tec_name,
    :ski_tec_intro,
    :ski_outline,
    :ski_stud,
    :ski_hidden);";

        // $fromPicTec = $_FILES["ski_tec_img"]["tmp_name"];
        // $toPicTec = "./img/course/course_img/{$_POST["ind_no"]}/{$_FILES["ski_tec_img"]["name"]}";
        // copy($fromPicTec, $toPicTec);
        // $fromPicSki = $_FILES["ski_img"]["tmp_name"];
        // $toPicSki = "./img/course/course_img/{$_POST["ind_no"]}/{$_FILES["ski_img"]["name"]}";
        // copy($fromPicSki, $toPicSki);
        $disAll = $pdo->prepare($sql);

        $disAll->bindValue(":ski_name", $_POST["ski_name"]);
        $disAll->bindValue(":ind_no", $_POST["ind_no"]);
        // $disAll->bindValue(":ski_buy_num", $_POST["ski_buy_num"]);
        $disAll->bindValue(":ski_price", $_POST["ski_price"]);
        $disAll->bindValue(":ski_time", $_POST["ski_time"]);
        $disAll->bindValue(":ski_intro", $_POST["ski_intro"]);
        $disAll->bindValue(":ski_harvest", $_POST["ski_harvest"]);
        $disAll->bindValue(":ski_link", $_POST["ski_link"]);
        $disAll->bindValue(":ski_img", $toPicSki);
        $disAll->bindValue(":ski_tec_img", $toPicTec);
        $disAll->bindValue(":ski_tec_name", $_POST["ski_tec_name"]);
        $disAll->bindValue(":ski_tec_intro", $_POST["ski_tec_intro"]);
        $disAll->bindValue(":ski_outline", $_POST["ski_outline"]);
        $disAll->bindValue(":ski_stud", $_POST["ski_stud"]);
        $disAll->bindValue(":ski_hidden", $_POST['ski_hidden']);
        $disAll->execute();

        header("Location:./backstage_index.php");
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
