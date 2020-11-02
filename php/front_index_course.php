<?php
try {
    require_once "connectMySql.php";
    $courseSql = "select a.*, b.IND_CLASS, b.IND_COLOR from SKILL_CLASS a join INDUSTRY_CLASS b on a.IND_NO = b.IND_NO where SKI_HIDDEN = 1 order by SKI_NO";
    $course = $pdo->query($courseSql);

    if ($course->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $courseRow = $course->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($courseRow);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>