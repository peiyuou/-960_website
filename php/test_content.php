<?php
try {
    require_once "connectMySql.php";
    $quizSql = " SELECT quiz.QUIZ_NO, quiz.QUIZ_CON, quiz.QUIZ_PIC_ONE, quiz.QUIZ_PIC_TWO, quiz.QUIZ_PIC_TWO,quiz.QUIZ_SEL_ONE_CONTENT, QUIZ_SEL_ONE_CLASS,quiz.QUIZ_SEL_TWO_CONTENT,QUIZ_SEL_TWO_CLASS, quiz.QUIZ_SEL_ONE_CLASS, quiz.QUIZ_SEL_TWO_CLASS FROM `quiz` where `QUIZ_USE` = 1";
    $quizContent = $pdo->query($quizSql);

    if ($quizContent->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $quizContentRow = $quizContent->fetchAll(PDO::FETCH_ASSOC);
        shuffle($quizContentRow);
        $limitContent= array();
        $limitContent[17] = $quizContentRow;
        //送出json字串
        // echo json_encode($quizContentRow);
        echo json_encode($limitContent[17]);
        
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>