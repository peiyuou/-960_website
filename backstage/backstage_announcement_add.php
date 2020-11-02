<?php
//   $_current ='backstage_announcement_add.php';
//   $_redirect = "http://" . str_replace($_current, '',$_SERVER['SERVER_NAME'].":".$_SERVER['SERVER_PORT'].$_SERVER['REQUEST_URI']) . 'backstage_index.php';
try {

    require_once "connectMySql.php";
    if ($pdo != false) {
        $sql = "INSERT INTO ANNOUNCEMENT(ANN_CONTENT,ANN_DATE,ANN_USE) VALUES(:ANN_CONTENT,:ANN_DATE,:ANN_USE);";


        $disAll = $pdo->prepare($sql);

        $disAll->bindValue(":ANN_CONTENT", $_POST["ANN_CONTENT"]);
        $disAll->bindValue(":ANN_DATE", $_POST["ANN_DATE"]);
        $disAll->bindValue(":ANN_USE", $_POST["ANN_USE"]);
        $disAll->execute();
        header("Location:./backstage_index.php");
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
