<?php
// echo '1' . $_POST["quiz_con"] . '<br>';
// echo '2' . $_POST["quiz_pic_one"] . '<br>';
// echo '3' . $_POST["quiz_sel_one_content"] . '<br>';
// echo '4' . $_POST["quiz_sel_one_class"] . '<br>';
// echo '5' . $_POST["quiz_pic_two"] . '<br>';
// echo '6' . $_POST["quiz_sel_two_content"] . '<br>';
// echo '7' . $_POST["quiz_sel_two_class"] . '<br>';
// echo '8' . $_POST["quiz_use"] . '<br>';

try {
    require_once "./connectMySql.php";

    $sql = "SELECT * FROM `quiz` WHERE quiz_con = :quiz_con";
    $quiz = $pdo->prepare($sql);
    $quiz->bindValue(":quiz_con", $_POST["quiz_con"]);
    $quiz->execute();
    // echo 1;
    $fromPicOne = $_FILES["quiz_pic_one"]["tmp_name"];
    $toPicOne = "./img/quiz/{$_FILES["quiz_pic_one"]["name"]}";
    copy($fromPicOne, $toPicOne);

    $fromPicTwo = $_FILES["quiz_pic_two"]["tmp_name"];
    $toPicTwo = "./img/quiz/{$_FILES["quiz_pic_two"]["name"]}";
    copy($fromPicTwo, $toPicTwo);

    if ($quiz->rowCount() == 0) {

        $quizSql = "INSERT INTO `quiz` (quiz_con,
            quiz_pic_one,
            quiz_pic_two,
            quiz_sel_one_content,
            quiz_sel_one_class,
            quiz_sel_two_content,
            quiz_sel_two_class,
            quiz_use
            )VALUES (:quiz_con,
            :quiz_pic_one,
            :quiz_pic_two,
            :quiz_sel_one_content,
            :quiz_sel_one_class,
            :quiz_sel_two_content,
            :quiz_sel_two_class,
            :quiz_use
            );";
        $insertQuiz = $pdo->prepare($quizSql);

        $insertQuiz->bindValue(":quiz_con", $_POST["quiz_con"]);
        $insertQuiz->bindValue(":quiz_pic_one", $toPicOne);
        $insertQuiz->bindValue(":quiz_sel_one_content", $_POST["quiz_sel_one_content"]);
        $insertQuiz->bindValue(":quiz_sel_one_class", $_POST["quiz_sel_one_class"]);
        $insertQuiz->bindValue(":quiz_pic_two", $toPicTwo);
        $insertQuiz->bindValue(":quiz_sel_two_content", $_POST["quiz_sel_two_content"]);
        $insertQuiz->bindValue(":quiz_sel_two_class", $_POST["quiz_sel_two_class"]);
        $insertQuiz->bindValue(":quiz_use", $_POST["quiz_use"]);
        $insertQuiz->execute();
        header("Location:./backstage_index.php");
    } else {
        // header("Location:/backstage_index.php");
        echo '此題目已存在';
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
