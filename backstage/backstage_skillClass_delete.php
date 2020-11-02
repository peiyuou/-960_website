<?php
// echo $_POST['ski_no'];

try {
    require_once "./connectMySql.php";
    if ($pdo != false) {
        // insert into order_mem
        $sql = "DELETE from skill_class WHERE ski_no = :SKI_NO";
        $disAll = $pdo->prepare($sql);

        $disAll->bindValue(":SKI_NO", $_POST["ski_no"]);

        $disAll->execute();

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
